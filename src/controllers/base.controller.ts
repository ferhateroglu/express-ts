import { autoBind } from '../utils';

class BaseController {
  constructor() {
    autoBind(this);
  }
}

export default BaseController;
