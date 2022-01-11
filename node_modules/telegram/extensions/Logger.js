"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const Helpers_1 = require("../Helpers");
let _level = undefined;
class Logger {
    constructor(level) {
        if (!_level) {
            _level = level || "info"; // defaults to info
        }
        this.isBrowser = !Helpers_1.IS_NODE;
        if (!this.isBrowser) {
            this.colors = {
                start: "\x1b[2m",
                warn: "\x1b[35m",
                info: "\x1b[33m",
                debug: "\x1b[36m",
                error: "\x1b[31m",
                end: "\x1b[0m",
            };
        }
        else {
            this.colors = {
                start: "%c",
                warn: "color : #ff00ff",
                info: "color : #ffff00",
                debug: "color : #00ffff",
                error: "color : #ff0000",
                end: "",
            };
        }
        this.messageFormat = "[%t] [%l] - [%m]";
    }
    /**
     *
     * @param level {string}
     * @returns {boolean}
     */
    canSend(level) {
        return _level
            ? Logger.levels.indexOf(_level) >= Logger.levels.indexOf(level)
            : false;
    }
    /**
     * @param message {string}
     */
    warn(message) {
        this._log("warn", message, this.colors.warn);
    }
    /**
     * @param message {string}
     */
    info(message) {
        this._log("info", message, this.colors.info);
    }
    /**
     * @param message {string}
     */
    debug(message) {
        this._log("debug", message, this.colors.debug);
    }
    /**
     * @param message {string}
     */
    error(message) {
        this._log("error", message, this.colors.error);
    }
    format(message, level) {
        return this.messageFormat
            .replace("%t", new Date().toISOString())
            .replace("%l", level.toUpperCase())
            .replace("%m", message);
    }
    static setLevel(level) {
        _level = level;
    }
    /**
     * @param level {string}
     * @param message {string}
     * @param color {string}
     */
    _log(level, message, color) {
        if (!_level) {
            return;
        }
        if (this.canSend(level)) {
            if (!this.isBrowser) {
                console.log(color + this.format(message, level) + this.colors.end);
            }
            else {
                console.log(this.colors.start + this.format(message, level), color);
            }
        }
        else {
        }
    }
}
exports.Logger = Logger;
Logger.levels = ["error", "warn", "info", "debug"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vZ3JhbWpzL2V4dGVuc2lvbnMvTG9nZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdDQUFxQztBQUVyQyxJQUFJLE1BQU0sR0FBdUIsU0FBUyxDQUFDO0FBRTNDLE1BQWEsTUFBTTtJQWFmLFlBQVksS0FBYztRQUN0QixJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsTUFBTSxHQUFHLEtBQUssSUFBSSxNQUFNLENBQUMsQ0FBQyxtQkFBbUI7U0FDaEQ7UUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsaUJBQU8sQ0FBQztRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHO2dCQUNWLEtBQUssRUFBRSxTQUFTO2dCQUNoQixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLEtBQUssRUFBRSxVQUFVO2dCQUNqQixLQUFLLEVBQUUsVUFBVTtnQkFDakIsR0FBRyxFQUFFLFNBQVM7YUFDakIsQ0FBQztTQUNMO2FBQU07WUFDSCxJQUFJLENBQUMsTUFBTSxHQUFHO2dCQUNWLEtBQUssRUFBRSxJQUFJO2dCQUNYLElBQUksRUFBRSxpQkFBaUI7Z0JBQ3ZCLElBQUksRUFBRSxpQkFBaUI7Z0JBQ3ZCLEtBQUssRUFBRSxpQkFBaUI7Z0JBQ3hCLEtBQUssRUFBRSxpQkFBaUI7Z0JBQ3hCLEdBQUcsRUFBRSxFQUFFO2FBQ1YsQ0FBQztTQUNMO1FBQ0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxrQkFBa0IsQ0FBQztJQUM1QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE9BQU8sQ0FBQyxLQUFhO1FBQ2pCLE9BQU8sTUFBTTtZQUNULENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDL0QsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNoQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLENBQUMsT0FBZTtRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLENBQUMsT0FBZTtRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsT0FBZTtRQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsT0FBZTtRQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsTUFBTSxDQUFDLE9BQWUsRUFBRSxLQUFhO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLGFBQWE7YUFDcEIsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3ZDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ2xDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBYTtRQUN6QixNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ25CLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsSUFBSSxDQUFDLEtBQWEsRUFBRSxPQUFlLEVBQUUsS0FBYTtRQUM5QyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsT0FBTztTQUNWO1FBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNqQixPQUFPLENBQUMsR0FBRyxDQUNQLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FDeEQsQ0FBQzthQUNMO2lCQUFNO2dCQUNILE9BQU8sQ0FBQyxHQUFHLENBQ1AsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQy9DLEtBQUssQ0FDUixDQUFDO2FBQ0w7U0FDSjthQUFNO1NBQ047SUFDTCxDQUFDOztBQWhITCx3QkFpSEM7QUFoSFUsYUFBTSxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMifQ==