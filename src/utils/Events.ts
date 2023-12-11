const events = new Map()

export default {
    $on(eventName: string, fn: Function) {
        if (!events.has(eventName)) {
            events.set(eventName, [])
        }
        events.get(eventName).push(fn)
    },

    $off(eventName: string, fn: Function) {
        throw { message: 'Not implemented' }
    },
    $emit(eventName: string, data: any) {
        if (events.has(eventName)) {
            events.get(eventName).forEach((fn: Function) => fn(data));
        }
    }
};