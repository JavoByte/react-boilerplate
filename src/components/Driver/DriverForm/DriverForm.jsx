import React from 'react';
import s from './DriverForm.css';

class DriverForm extends React.Component {
  render() {
    return (
      <div className={s.container}>
        <form>
          <fieldset>
            <div className="form-group">
              <label htmlFor="first_name">Nombre</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label htmlFor="last_name">Apellido(s)</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label htmlFor="first_name">Correo electrónico</label>
              <input type="email" />
            </div>

            <button type="submit">Enviar</button>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default DriverForm;
