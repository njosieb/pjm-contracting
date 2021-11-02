import React, { Component } from 'react'

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default class ContactForm extends Component {
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleSubmit = e => {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...this.state })
    })
      .then(() => alert('Success!'))
      .catch(error => alert(error))

    e.preventDefault()
  }

  render() {
    return (
      <div>
        <h3>Get An Estimate</h3>
        <p>
          Tell me about your project and I'll work with you on providing an
          estimate!
        </p>
        <form
          name="contact-recaptcha"
          method="post"
          action="/thanks/"
          data-netlify="true"
          data-netlify-recaptcha="true"
          onSubmit={this.handleSubmit}
        >
          <div className="field">
            <label className="label">Your name:</label>
            <div className="control">
              <input
                required
                className="input"
                type="text"
                name="name"
                onChange={this.handleChange}
              />
            </div>
            <label className="label">Your email:</label>
          </div>
          <div className="field">
            <div className="control">
              <input
                required
                className="input"
                type="email"
                name="email"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Describe your project:</label>
            <div className="control">
              <textarea
                required
                className="textarea"
                name="description"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">What is your budget:</label>
            <div className="control">
              <input
                required
                type="text"
                className="input"
                name="budget"
                onChange={this.handleChange}
              />
              {/* TODO: add this to CMS */}
              <p className="help">
                A rough estimate is okay. Unfortunately we do not give estimates
                for projects that aren't sure what their budget just yet.
              </p>
            </div>
          </div>
          <div data-netlify-recaptcha="true" />
          <div className="field">
            <div className="control">
              <button className="button is-outlined" type="submit">
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
