import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as contactActions from '../../../actions/contact';
import { sendApplicationMessage } from '../../../actions/application';
import ContactForm from './ContactForm';

const mapStateToProps = state => ({
  contact: state.contact,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...contactActions, sendApplicationMessage }, dispatch);

class ContactContainer extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Contact</title>
          <meta name="description" content="Send us a message" />
        </Helmet>
        <ContactForm {...this.props} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactContainer);
