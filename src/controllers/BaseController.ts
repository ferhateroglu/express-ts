import autoBind from '../utils/autoBind';

class BaseController {
  constructor() {
    autoBind(this);
  }
}

export default BaseController;
