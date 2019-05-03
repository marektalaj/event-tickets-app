import { EventSearchPipe } from 'src/main/webapp/app/entities/event/event-search.pipe';

describe('EventSearchPipe', () => {
    it('create an instance', () => {
        const pipe = new EventSearchPipe();
        expect(pipe).toBeTruthy();
    });
});
