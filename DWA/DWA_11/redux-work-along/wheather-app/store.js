/**
 * @typedef {object} Item
 * @param {number}  value
 */

/**
 * @typedef {object} State
 * @prop {Item} wind
 * @prop {Item} temperature
 * @prop {Item} humidity 
 */

/**
 * @callback Nofity
 * @param {State} next
 * @param {State} prev 
 */ 

/**
 * @callback Action
 * @param {State}
 * @param {State}
 */

export const Action = {}

/**
 * @callback Update
 * @param {Action}
 */

/**
 * @callback Subscribe
 * @param {Notify} notify
 */

/**
 * @callback EmptyFn
 */


/**
 * @typedef {object} Store
 * @prop {Update} update
 * @prop {Subscribe} subscribe
 */

const initial = {
    wind: {
        value: 1,
    },
    temperature: {
        value: 1,
    },
    humidity: {
        value: 1,
    },
}

/**
 * @type {Array<State>}
 */
const states = [initial]

/**
 * @type {Array<Notify>}
 */
const notifiers =[]

/**
 * @param {Action} action 
 */

export const update = (action) => {
    if (typeof action !== 'function') {
        throw new Error('action is required to be function')
    }

    const prev = Object.freeze({ ...states[0]})
    const next = Object.freeze({ ...action(prev)})

    const handler  = (notify) => notify(prev, next)
    notifiers.forEach(handler)
    states.unshift(next)
}

/**
 * @param {Notify} notify
 * @returns
 */

export const subscribe = (notify) => {
    notifiers.push(notify)

    const unsubscribe = () => {
        const handler = (current) => current !== notify
        const result = notifiers.filter(handler)
        notifiers = result
    }

    return unsubscribe
}