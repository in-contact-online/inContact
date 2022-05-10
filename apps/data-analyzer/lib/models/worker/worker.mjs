async function main(options) {
     // todo: implement analyzing logic
     console.log(options);
}

/**
 * Description
 * @param {Object} report
 * @property {String} report.types - description
 * @return {Promise<void>}
 */
async function handleMessage(report) {
     try {
          await main(report);
          console.log('Done');
          process.exit(0);
     } catch (err) {
          console.log('Error');
          console.error(err);
          process.exit(1);
     }
}

process.on('message', handleMessage);

process.on('uncaughtException', (reason) => {
     console.log('uncaughtException');
     console.error('reason ', JSON.stringify(reason));
     process.exit(1);
});

process.on('unhandledRejection', (reason) => {
     console.error(' unhandledRejection');
     console.error('reason ', JSON.stringify(reason));
     process.exit(1);
});

process.send('ready');
