import * as utils from '../../src/assets/js/es5/modules/utils';

describe('utils methods', () => {
  describe('getRandom', () => {
    it('should return value between 1 and 4 and it may be 1', () => {
      let randomValue = utils.getRandom(1, 4);
      expect(randomValue).not.toBeLessThan(1);
      expect(randomValue).not.toBeGreaterThan(3);
    });

    it('should return value between 200 and 400 and it may be 200', () => {
      let randomValue = utils.getRandom(200, 400);
      expect(randomValue).not.toBeLessThan(200);
      expect(randomValue).not.toBeGreaterThan(399);
    });

    it('should return value equal to 1', () => {
      let randomValue = utils.getRandom(1, 2);
      expect(randomValue).toEqual(1);
    });

    it('should return value equal to 3220', () => {
      let randomValue = utils.getRandom(3220, 3221);
      expect(randomValue).toEqual(3220);
    });
  });


  describe('createElement', () => {
    let container, element;
    beforeAll(() => {
      container = document.createElement('div');
      element = utils.createElement(container, 'span', 'spanId', 'spanClass', {background: 'yellow'});
    });

    it('should create a span and append it to container', () => {
      expect(container.firstChild).toBe(element);
      expect(element.tagName.toLowerCase()).toBe('span');
    });

    it('should have id = spanId', () => {
      expect(element.id).toEqual('spanId');
    });

    it('should have class = spanClass ', () => {
      expect(element.className).toEqual('spanClass');
    });

    it('should have background = yellow as a style object' , () => {
      expect(element.style.background).toEqual('yellow');
    });
  });

  describe('copy', () => {
    it('should copy all properties of an object', () => {
      let objToCopy = {x: 1, y: 'str', z: false};
      let newObj = utils.copy(objToCopy);

      expect(newObj).toEqual(objToCopy);
    });

    it('should return totally new obj', () => {
      let objToCopy = {x: 1, y: 'str', z: false};
      let newObj = utils.copy(objToCopy);

      objToCopy.x = 2;
      expect(newObj).not.toEqual(objToCopy);
    });
  });
});
