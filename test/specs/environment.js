
import { level, elements, Vector } from '../../src/assets/js/es5/modules/environment';

describe('Environment', () => {
  describe('levels', () => {

    it('should be an array', () => {
      expect(level.constructor).toEqual(Array);
    });

  });

  describe('elements', () => {
    it('should contain player => (-)', () => {
      expect(elements.player).toEqual('-');
    });

    it('should contain wall => (x)', () => {
      expect(elements.wall).toEqual('x');
    });

    it('should contain food => (=)', () => {
      expect(elements.food).toEqual('=');
    });
  });

  describe('elements and levels togather', () => {
    it('should make the first string is a wall', () => {
      [].forEach.call(level[0], (character) => {
        expect(character).toEqual(elements.wall);
      });
    });

    it('should make the last string is a wall', () => {
      [].forEach.call(level[level.length - 1], (character) => {
        expect(character).toEqual(elements.wall);
      });
    });

    it('should make the first and last character is a wall for the rest of strings', () => {
      level.forEach((str, i) => {
        if(i !== level.length - 1 || i !== 0) {
          expect(str[0]).toEqual(elements.wall);
          expect(str[str.length - 1]).toEqual(elements.wall);
        }
      });
    })
  });

  describe('Vector class', () => {
    it('should be a class that has x and y props', () => {
      let vector = new Vector(3, 4);
      expect(vector.x).toEqual(3);
      expect(vector.y).toEqual(4);
    });
  });
});
