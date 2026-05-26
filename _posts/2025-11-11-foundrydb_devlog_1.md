---
layout: post
title: FoundryDB Developer Log 1
date: 2025-11-11
description: Building Phase 1 of a toy SQL database in Python
tags: FoundryDB Python Databases SQL
categories: Development
---

> A behind-the-scenes look at building FoundryDB, a toy SQL database written from scratch in Python.

I had a bit of time on my hands and wanted a project that was both practical and technically challenging. A couple of days ago, I asked myself: _"What if I built a small database in Python?"_ I have been teaching Python for the last few semesters, so the language itself was familiar. The challenge was in the systems design.

The idea sounded good in theory, but I had never built a database before. To frame the work, I used ChatGPT to draft a roadmap of core features and implementation phases.

## We'll call it FoundryDB

{% include figure.liquid loading="eager" path="assets/img/banner.png" class="img-fluid rounded z-depth-1" zoomable=false %}

GitHub repository: [a1inani/FoundryDB](https://github.com/a1inani/FoundryDB)

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

| Module               | Responsibility                                                   |
| -------------------- | ---------------------------------------------------------------- |
| `foundrydb.database` | Orchestrates catalog and storage; entry point for REPL and tests |
| `foundrydb.storage`  | Handles file I/O (`insert`, `scan`)                              |
| `foundrydb.catalog`  | Maintains metadata stub (created in Phase 1)                     |
| `foundrydb.cli`      | Simple interactive shell                                         |
| `tests/`             | Pytest suite verifying insert/scan/persistence                   |

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
- Benchmarks: not yet measured in this phase (planned for Phase 2+)

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

### What I learned

Building even a toy database taught me how critical consistency, atomic writes, and metadata management are. I now understand why mature systems like SQLite are as intricate as they are.

---

### Next Phase: Simple Query Language (Phase 2)

Goals:

- Hand-rolled SQL parser (SELECT, WHERE)
- Expression evaluation
- Query execution via full table scan
- More formal AST and error handling
