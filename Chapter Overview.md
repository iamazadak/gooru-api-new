# Tutorial: gooru-api-new

This project is like an automated assistant that helps teachers and administrators track student engagement. It **automatically fetches** *timespent data* for specific classes from the Gooru API and then neatly organizes all this information into an **easy-to-read Excel spreadsheet**, providing a clear overview of how students are spending time on assignments and reporting on the overall process status.


## Visual Overview

```mermaid
flowchart TD
    A0["API Data Fetcher
"]
    A1["Excel Report Generator
"]
    A2["External Configuration Management
"]
    A3["Iterative Data Processing
"]
    A4["Operational Monitoring & Reporting
"]
    A2 -- "Supplies iteration list" --> A3
    A2 -- "Configures API client" --> A0
    A3 -- "Invokes fetch per item" --> A0
    A0 -- "Adds data to report" --> A1
    A0 -- "Updates metrics" --> A4
    A3 -- "Generates final report" --> A4
```

## Chapters

1. [External Configuration Management
](https://github.com/iamazadak/gooru-api-new/blob/1df4eb1809fbea302d45dfcfaee350416491d754/Chapter%201%3A%20External%20Configuration%20Management.md)
3. [Iterative Data Processing
](https://github.com/iamazadak/gooru-api-new/blob/26b1e6d0334dd82867373c28e24e863484195ef4/Chapter%202%3A%20Iterative%20Data%20Processing.md)
5. [API Data Fetcher
](https://github.com/iamazadak/gooru-api-new/blob/a405dc63993852b90f897bbd4400386ae9208312/Chapter%203%3A%20API%20Data%20Fetcher.md)
6. [Excel Report Generator
](https://github.com/iamazadak/gooru-api-new/blob/16ea85d77308bc8b79dbb7de8010d82bfdeee321/Chapter%204%3A%20Excel%20Report%20Generator.md)
7. [Operational Monitoring & Reporting
](https://github.com/iamazadak/gooru-api-new/blob/4b4856be49885890871a293fbb46f9c90d68855c/Chapter%205%3A%20Operational%20Monitoring%20%26%20Reporting.md)

---
