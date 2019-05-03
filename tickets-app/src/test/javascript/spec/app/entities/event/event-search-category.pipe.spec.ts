import { EventSearchCategoryPipe } from 'app/entities/event/event-search-category.pipe';

describe('EventSearchCategoryPipe', () => {
    it('create an instance', () => {
        const pipe = new EventSearchCategoryPipe();
        expect(pipe).toBeTruthy();
    });
});
