import Queue, { Job, DoneCallback } from 'bull';
import jobMapping from './topicJobProcessorMapping';
import { IMessageBody } from './messages/IMessageBody';

export default function createQueue(): Queue.Queue<any> {
    const queue = new Queue('MessageQueue', {
        redis: { port: 6379, host: '127.0.0.1' }
    });

    queue.process((job: Job<IMessageBody<any>>, done: DoneCallback) => {
        const topic = job.data.topic;
        const handler = jobMapping[topic];

        if (handler === undefined) {
            return done();
        }

        return handler(job, done);
    });

    return queue;
}
