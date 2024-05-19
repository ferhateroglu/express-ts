import autoBind from '../utils/auto-bind';

class BaseController {
  constructor() {
    autoBind(this);
  }
}

export default BaseController;
