# IN-CONTACT LOGGER UTIL

Logger based on winston library

## Basic Usage

```
import { createLogger, LoggerTypes } from '@in-contact/logger';

const logger = createLogger({
        type: LoggerTypes.Winston,
        context: {
            logLevel: 'info',
            serviceName: 'My service name',
        },
    });
...
```
