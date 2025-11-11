---
layout: post
title: FoundryDB Developer Log 1
date: 2025-11-11
description: Creating a toy SQL database in Python
tags: FoundryDB SQL Database Python
categories: Development
---

> A behind-the-scenes look at building FoundryDB — a toy SQL database written from scratch in Python.

I've got a bit of time on my hands, and the last few blog posts are proof that I have been looking for something to keep me busy. A couple of days ago, I thought, *"What if I built a small database in Python?"* I've been teaching a course in Python programming the last few semesters, so I'm far from rusty in the language. Plus, it would present a decent optimization challenge I can hopefully throw some algorithms and data structures at further down the line.

Now, it all sounds great in theory, but I have never built a database before. Where would I even begin? So I reached for an LLM (ChatGPT in this case) and asked it to generate a roadmap highlighting key concepts that need to be implemented.

## We'll call it FoundryDB
{% include figure.liquid loading="eager" path="assets/img/banner.png" class="img-fluid rounded z-depth-1" zoomable=false %}

🔗 [GitHub Repository → a1inani/FoundryDB](https://github.com/a1inani/FoundryDB)

---

### Phase 1 Objectives
Implement a **minimal persistent storage layer** for FoundryDB, capable of:
- Writing table rows to disk
- Reading all rows sequentially
- Surviving restarts
- Exposing a simple programmatic API (`insert`, `scan`)

No SQL parsing, indexing, or transactions yet.

---

### Architecture Overview
```plaintext
Database
├── Catalog → stores schema metadata (catalog.meta)
├── StorageEngine → manages .tbl files (JSON-lines)
└── Foundries/ → directory holding table files
```

---

### Components
| Module | Responsibility |
|---------|----------------|
| `foundrydb.database` | Orchestrates catalog and storage; entry point for REPL and tests |
| `foundrydb.storage` | Handles file I/O (`insert`, `scan`) |
| `foundrydb.catalog` | Maintains metadata stub (created in Phase 1) |
| `foundrydb.cli` | Simple interactive shell |
| `tests/` | Pytest suite verifying insert/scan/persistence |

---

### File Format
- One `.tbl` file per table, stored under the database path  
- Each line = one row (JSON object)

Example `users.tbl`
```json
{"id":1,"name":"Alice"}
{"id":2,"name":"Bob"}
```

---

### StorageEngine API
```python
storage = StorageEngine("foundries/demo")
storage.insert("users", {"id": 1, "name": "Alice"})
for row in storage.scan("users"):
    print(row)
```

---

### Database Class
- Initializes Catalog + StorageEngine
- Provides `.execute()` stub for later SQL handling

```python
db = Database("foundries/demo")
db.execute("INSERT INTO users VALUES {'id':1,'name':'Alice'};")
db.execute("SELECT * FROM users;")
```

---

### Lessons & Decisions
- Format: JSON-lines for human readability & ease of testing
- No schema validation yet: will arrive in Phase 3 (Catalog expansion)
- Append-only writes: simpler recovery and safe for Phase 1
- Error handling: breaks on corrupted lines gracefully
- Next: build a basic SQL parser for SELECT and WHERE clauses

---

### Build & Release Process
```bash
pytest -v           # all green
ruff check . --fix  # clean code
mypy foundrydb/     # no typing errors
```

Confirm version inside `foundrydb/__init__.py`:
```python
__version__ = "0.1.0"
```

Update README.md badges:
```markdown
![Version](https://img.shields.io/badge/version-0.1.0-orange)
```

```bash
pip install build twine
python -m build
twine upload dist/*
```

---

### Phase 1 Checklist
- [x] Persistent storage layer
- [x] Basic API (`insert`, `scan`)
- [x] File-based persistence
- [ ] SQL parser
- [x] Query execution

---

### Reflections
Building even a toy database taught me how critical consistency, atomic writes, and metadata management are. I now understand why mature systems like SQLite are as intricate as they are.

---

### Next Phase: Simple Query Language (Phase 2)
Goals:
- Hand-rolled SQL parser (SELECT, WHERE)
- Expression evaluation
- Query execution via full table scan
- More formal AST and error handling

---

_Tags: #Python #Databases #FoundryDB #DevLog_

