# @rtls-platform/logger

Logger based on winston library

## Basic Usage

```
import { createLogger, LoggerTypes } from '@rtls-platform/logger';

const logger = createLogger({
        type: LoggerTypes.Winston,
        context: {
            logLevel: 'info',
            serviceName: 'My service name',
        },
    });
...
```
