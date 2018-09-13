const seedResponse = require('../index.js');

test('res.trigger(), res.on()', (done) => {
  const iRes = new seedResponse();
  const argv = ['a', 'b'];
  iRes.on('finished', (...iArgv) => {
    expect(iArgv).toEqual(argv);
    done();
  });
  iRes.trigger('finished', argv);
});

test('Response listener test, first on, second trigger', async () => {
  const iRes = new seedResponse();

  const mark = {
    queue: [],
    msg: 0,
    finished: 0,
    error: 0
  };

  iRes
    .on('msg', () => {
      mark.msg++;
      mark.queue.push('msg');
    })
    .on('finished', () => {
      mark.finished++;
      mark.queue.push('finished');
    });

  iRes.trigger('msg', ['a']);
  iRes.trigger('msg', ['b']);
  iRes.trigger('finished', ['c']);

  expect(mark.queue).toEqual(['msg', 'msg', 'finished']);
  expect(mark.msg).toEqual(2);
  expect(mark.finished).toEqual(1);
});

test('Response listener test, first trigger, second on', async () => {
  const iRes = new seedResponse();

  const mark = {
    queue: [],
    msg: 0,
    finished: 0,
    error: 0
  };

  iRes.trigger('msg', ['a']);
  iRes.trigger('msg', ['b']);
  iRes.trigger('finished', ['c']);

  iRes
    .on('msg', () => {
      mark.msg++;
      mark.queue.push('msg');
    })
    .on('finished', () => {
      mark.finished++;
      mark.queue.push('finished');
    });



  expect(mark.queue).toEqual(['msg', 'msg', 'finished']);
  expect(mark.msg).toEqual(2);
  expect(mark.finished).toEqual(1);
});
