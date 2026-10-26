# MDB Tools — command-line access to MS Access databases

The suite you installed on **2026-09-07** is **`mdbtools` 0.7.1-6build1** (Ubuntu
package), plus its two shared libraries:

| Package | Version | Role |
|---|---|---|
| `mdbtools` | 0.7.1-6build1 | The `mdb-*` command-line utilities |
| `libmdb2` | 0.7.1-6build1 | Core JET / MDB reader library |
| `libmdbsql2` | 0.7.1-6build1 | SQL layer used by `mdb-sql` |

Binaries in `/usr/bin`:

```
mdb-ver        mdb-tables     mdb-schema     mdb-export
mdb-sql        mdb-prop       mdb-array      mdb-header
mdb-parsecsv   mdb-hexdump
```

`mdbtools` is **read-only** — there is no way to write back into the `.mdb`/`.accdb`
file with these tools.

> **Version note.** 0.7.1 is the old (2011-era) release that Ubuntu 20.04 ships.
> The newer upstream 1.0.x adds `mdb-count`, `mdb-json`, `mdb-queries`, `mdb-import`
> and a much better `mdb-sql`. Several workarounds below exist purely because of
> 0.7.1's limitations.

## The database on this machine

```
/home/mperdikeas/repos/prj/cognitera-iacs/p371/p371-reports-adhoc-work/2026-09-00/analysis.accdb
```

144 MB, format **ACE14** (Access 2010+), one user table `analysis` with 27 columns
and 410,847 rows. All examples below are run against it.

Set a shell variable first so the examples stay short:

```bash
DB=~/repos/prj/cognitera-iacs/p371/p371-reports-adhoc-work/2026-09-00/analysis.accdb
```

## 1. What kind of file is it?

```bash
mdb-ver "$DB"
```

```
ACE14
```

Possible values: `JET3` (Access 97), `JET4` (2000–2003), `ACE12`/`ACE14`/`ACE15`
(2007 and later `.accdb`).

## 2. List the tables

```bash
mdb-tables -1 "$DB"          # one per line
mdb-tables "$DB"             # tab-separated on one line
mdb-tables -1 -S "$DB"       # include the MSys* system tables
```

```
analysis
```

## 3. Show a table's structure

### As DDL — `mdb-schema`

```bash
mdb-schema "$DB"                      # all tables, Access dialect
mdb-schema -T analysis "$DB"          # one table only
```

```sql
CREATE TABLE [analysis]
 (
        [ID]                    Long Integer,
        [Πληρωμή εξισωτικής]    Text (100),
        [ΑΦΜ]                   Text (40),
        [Επώνυμο]               Text (120),
        [Ποσό]                  Currency,
        [Συν Δηλ Εκτ (ha)]      Double,
        ...
 );
```

Append a **backend** to get DDL in another dialect — `access` (default), `sqlite`,
`postgres`, `mysql`, `oracle`, `sybase`:

```bash
mdb-schema "$DB" postgres
mdb-schema "$DB" sqlite
```

```sql
-- postgres
CREATE TABLE "analysis"
 (
        "ID"                    SERIAL,
        "Πληρωμή εξισωτικής"    VARCHAR (100),
        "ΑΦΜ"                   VARCHAR (40),
        ...
```

Useful schema flags: `--drop-table`, `--no-not-null`, `--no-indexes`,
`--no-relations`, `--default-values`, `-N <namespace>`.

### As a compact field list — `mdb-sql`

```bash
printf 'describe table analysis\ngo\n' | mdb-sql -H -p "$DB"
```

```
ID                      Long Integer    4
Πληρωμή εξισωτικής      Text            100
ΑΦΜ                     Text            40
Επώνυμο                 Text            120
Ποσό                    Currency        8
```

### Just the column names, numbered

Handy because you will be addressing columns *by position* in the pipelines below:

```bash
mdb-export -d '|' "$DB" analysis | head -1 | tr '|' '\n' | nl
```

```
     1  ID
     2  Πληρωμή εξισωτικής
     3  ΑΦΜ
     4  Επώνυμο
     5  Όνομα
```

## 4. Count the rows

0.7.1 has no `mdb-count`, and its `mdb-sql` does not implement `COUNT(*)`. Export
and count lines instead — subtract the header row:

```bash
mdb-export "$DB" analysis | tail -n +2 | wc -l
```

```
410847
```

Or suppress the header with `-H` and skip the arithmetic:

```bash
mdb-export -H "$DB" analysis | wc -l
```

This reads the whole table (~14 s for these 410 k rows), so cache it if you need
the number more than once. Note it counts *lines*, so a text field containing a
newline would inflate the count; use `-R` to set an unambiguous row delimiter if
that is a concern.

## 5. Export data — `mdb-export`

This is the workhorse. Full CSV dump:

```bash
mdb-export "$DB" analysis > analysis.csv
```

```
ID,Πληρωμή εξισωτικής,ΑΦΜ,Επώνυμο,Όνομα,...
1,"Ορεινές (2η εκκαθάριση)","002448127","ΧΑΤΖΗΓΡΗΓΟΡΙΟΥ","ΓΡΗΓΟΡΙΟΣ",...
```

Options:

| Flag | Effect |
|---|---|
| `-H` | Suppress the header row |
| `-Q` | Don't wrap text fields in quotes |
| `-d <delim>` | Column delimiter (default `,`) |
| `-R <delim>` | Row delimiter (default newline) |
| `-q <char>` | Quote character (default `"`) |
| `-X <char>` | Escape character for quotes inside a field (default: doubling) |
| `-I <backend>` | Emit `INSERT` statements instead of CSV |
| `-D <format>` | Date format, `strftime(3)` syntax |
| `-N <ns>` | Prefix identifiers with a namespace |
| `-b strip\|raw\|octal` | How to handle binary/OLE columns |

Tab-separated, unquoted, no header — the friendliest shape for `awk`/`cut`:

```bash
mdb-export -H -Q -d $'\t' "$DB" analysis
```

`INSERT` statements for a target dialect:

```bash
mdb-export -I postgres "$DB" analysis | head -1
```

```sql
INSERT INTO "analysis" ("ID", "Πληρωμή εξισωτικής", "ΑΦΜ", ...) VALUES (1, ...);
```

ISO dates:

```bash
mdb-export -D '%Y-%m-%d' "$DB" analysis
```

## 6. Ad-hoc queries

### The direct route: `mdb-sql`

```bash
printf 'select ID from analysis where ID < 5\ngo\n' | mdb-sql -H -p -d '|' "$DB"
```

```
1
2
3
4
4 Rows retrieved
```

Run it with no redirection for an interactive prompt:

```bash
mdb-sql "$DB"
```

Flags: `-H` suppress header, `-p` pretty-print off (plain delimited rows),
`-d <delim>` column delimiter, `-i <file>` read SQL from a file, `-o <file>` write
results to a file.

**Know the limits before you rely on it** — all four of these were tested against
this database and all four fail in 0.7.1:

| What you try | What happens |
|---|---|
| A trailing `;` on the statement | `syntax error near ;` — terminate with `go` on its own line instead, never a semicolon |
| `select count(*) …` and any aggregate | `syntax error near (` — no aggregate functions at all |
| A non-ASCII column name, e.g. `ΑΦΜ` | `syntax error near ?` — the lexer is ASCII-only |
| Bracketing it as `[ΑΦΜ]` | `syntax error near [` — no identifier quoting either |

There are also no joins, no `GROUP BY`, no `ORDER BY` and no `LIMIT`. In practice
`mdb-sql` here is good for `describe table` and for trivial `SELECT`s over
ASCII-named columns. **For this database, whose columns are nearly all Greek, it is
effectively unusable for querying** — use one of the two routes below.

### Route A: pipe the export through Unix tools

Good for one-off questions, no import step. Count and rank the values of column 2
(`Πληρωμή εξισωτικής`):

```bash
mdb-export -Q -d $'\t' "$DB" analysis \
  | awk -F'\t' 'NR>1 {s[$2]++} END {for (k in s) printf "%8d  %s\n", s[k], k}' \
  | sort -rn
```

```
  254584  Ορεινές (2η εκκαθάριση)
  131305  Μειονεκτικές (2η εκκαθάριση)
   24958  Λοιπές (2η εκκαθάριση)
```

Sum a currency column (column 20, `Πληρωτέο (€)`) per category:

```bash
mdb-export -H -Q -d $'\t' "$DB" analysis \
  | awk -F'\t' '{s[$2] += $20} END {for (k in s) printf "%18.2f  %s\n", s[k], k}'
```

Pull a few columns for one ΑΦΜ:

```bash
mdb-export -d $'\t' "$DB" analysis \
  | awk -F'\t' 'NR==1 || $3=="\"002448127\""' \
  | cut -f1,3,4,5,20
```

### Route B: load into PostgreSQL and use real SQL

The right move for anything you will query more than once — 410 k rows with
27 columns deserve an index. `psql` is already installed on this machine.

```bash
createdb accdb_analysis

# schema, then data
mdb-schema "$DB" postgres           | psql -q accdb_analysis
mdb-export -I postgres "$DB" analysis | psql -q accdb_analysis
```

Then query it properly:

```bash
psql accdb_analysis -c 'SELECT count(*) FROM analysis'
psql accdb_analysis -c 'SELECT "Πληρωμή εξισωτικής", count(*), sum("Πληρωτέο (€)")
                        FROM analysis GROUP BY 1 ORDER BY 2 DESC'
```

A `COPY` of the CSV is much faster than 410 k individual `INSERT`s:

```bash
mdb-schema "$DB" postgres | psql -q accdb_analysis
mdb-export "$DB" analysis | psql -q accdb_analysis \
  -c "\copy analysis FROM STDIN WITH (FORMAT csv, HEADER true)"
```

Note `mdb-schema … postgres` maps the Access autonumber `ID` to `SERIAL`; change it
to plain `INTEGER` first if you want the exported IDs preserved without a sequence
tagging along.

> `sqlite3` is **not** installed here, so the otherwise-popular
> `mdb-schema "$DB" sqlite | sqlite3 out.db` recipe needs
> `sudo apt install sqlite3` first.

## 7. Character encoding

Access files are not UTF-8 internally. Two environment variables control the
conversion:

```bash
# charset of a JET3 (Access 97) source file; default CP1252
export MDB_JET3_CHARSET=CP1253      # e.g. Greek Access 97 files

# output charset; default UTF-8
export MDBICONV=UTF-8
```

`ACE14`/`JET4` files store text as UTF-16 and need no input hint — the Greek in
`analysis.accdb` comes out as correct UTF-8 with no configuration.

## 8. The remaining utilities

```bash
mdb-prop "$DB" analysis        # per-object properties  → "No properties." here
mdb-array "$DB" analysis       # dump the table as a C array literal
mdb-header "$DB"               # C header of the table structs
mdb-hexdump "$DB"              # raw page-level hex dump, for debugging
mdb-parsecsv                   # generates C code from a CSV; a build-time helper
```

`mdb-header` fails on this database with `ERROR: unsupported type.` — it does not
handle every ACE14 column type. Neither of `mdb-array`/`mdb-header` is useful for
data analysis; they exist to generate C source.

## 9. Gotchas worth remembering

- **`mdb-sql` statements end with `go`, not `;`.** A trailing semicolon is a syntax
  error.
- **Doubles come out in exponential notation.** `0.92` exports as
  `9.2000000000000004e-01`. Fine for `awk` and for PostgreSQL `double precision`,
  but it will surprise a naive CSV consumer or a spreadsheet import.
- **Every operation is a full table scan.** There is no index use for filtering, so
  filtering with `awk` costs the same as exporting everything. For repeated
  querying, import once (§6 Route B).
- **Column order is your API.** With no working `SELECT` by name, the positional
  numbering from §3 is what you actually address columns by.
- **Read-only.** Nothing here modifies the `.accdb`.
- **`MSys*` tables are hidden** unless you pass `-S` to `mdb-tables`.

## 10. Getting the newer mdbtools (optional)

If the 0.7.1 limits become annoying — particularly the `mdb-sql` restrictions —
upstream 1.0.x is a straightforward source build:

```bash
sudo apt install build-essential libglib2.0-dev unixodbc-dev \
                 gawk bison flex autoconf automake libtool
git clone https://github.com/mdbtools/mdbtools.git
cd mdbtools && autoreconf -i -f && ./configure && make && sudo make install
```

That gets you `mdb-count` (a real row count without exporting), `mdb-json`,
`mdb-queries` (reads the saved queries stored in the Access file) and a SQL parser
that handles quoted and non-ASCII identifiers.

## References

- `man mdb-tables`, `man mdb-schema`, `man mdb-export`, `man mdb-sql`
- <https://github.com/mdbtools/mdbtools>
