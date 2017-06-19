/**
 * Basic application model.
 * All models should extend this class and define an static attributes array.
 * When instanciated, the model will define its own properties based on the attributes array
**/
class Model {
  static attributes = [
    'id',
  ];

  constructor(attributes) {
    this.constructor.attributes.map((attr) => {
      this[attr] = attributes[attr];
      return null;
    });
  }
}

export default Model;
