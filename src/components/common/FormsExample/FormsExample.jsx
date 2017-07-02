import React from 'react';
import Form from '../Form';
import FormGroup from '../FormGroup';

class FormsExample extends React.Component {

  constructor(props) {
    super(props);
    this.onChangeNumber = this.onChangeNumber.bind(this);
  }

  onChangeNumber(event) {
    const value = event.target.value || '';
    let newValue = '';
    for (let i = 0; i < value.length; i++) {
      const c = parseInt(value[i], 10);
      if (!isNaN(c) && c >= 0 && c < 9) {
        newValue += c;
      }
    }
    return newValue;
  }


  render() {
    return (
      <div className="formsexample">
        <h4>
          Validated forms
        </h4>
        <p>
          Wrap provided <code>FormGroup</code> components in <code>Form</code>s
          to automatically validate
        </p>
        <Form
          validationRules={{
            required: ['required'],
          }}
        >
          <FormGroup type="text" name="required" label="This field will be required" />

        </Form>

        <h5>
          Supported types:
        </h5>

        <Form>
          <FormGroup
            type="select"
            name="required"
            label="Select"
            options={{
              USA: 'United States of America',
              MEX: 'Mexico',
              CAN: 'Canada',
              PAR: 'Paraguay',
              CAM: 'Camerun',
              ESP: 'Spain',
            }}
          />
        </Form>

        <h5>
          Handle value before saving in state
        </h5>
        <Form>
          <FormGroup name="numeric" type="text" label="This field accept only numbers" onChange={this.onChangeNumber} />
        </Form>
      </div>
    );
  }
}

export default FormsExample;
