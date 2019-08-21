import Topics from './topics'

export interface IMessageBody<T> {
    topic: Topics,
    data: T
}