import { TruncateArticleTitlePipe } from './truncate-article-title.pipe';

describe('TruncateArticleTitlePipe', () => {
  it('create an instance', () => {
    const pipe = new TruncateArticleTitlePipe();
    expect(pipe).toBeTruthy();
  });
});
