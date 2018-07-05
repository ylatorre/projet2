const form = window.document.getElementById('submit-job')

const submit = postOffer => {
  return fetch('http://localhost:3456/jobs', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    'credentials': 'include',
    body: JSON.stringify(postOffer)
  }).then(res => {
    if (res.ok) {
      Promise.resolve(res.body)
    } else {
      Promise.reject()
    }
  })
}

const getFormData = (form) => {
  const formElements = Array.from(form.querySelectorAll('input,select,textarea'))
  return formElements.reduce((result, element) => {
    result[ element.name ] = element.value
    return result
  }, {})
}

form.addEventListener('submit', event => {
  event.preventDefault()

  const lineBreak = str => {
    if (typeof str === 'undefined' || str === null) {
      return ''
    }
    const breakTag = '<br>'
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2')
  }
  const input = {
    contract: window.document.getElementById('contract-modal').value,
		    companyName: window.document.getElementById('company-name').value,
    title: window.document.getElementById('job-title').value,
    description: lineBreak(window.document.getElementById('job-description').value),
    salaryRange: window.document.getElementById('salary-range').value,
    city: window.document.getElementById('city').value,
    contact: window.document.getElementById('contact-mail').value
  }

  submit(input).then(() => {
    document.location.reload(true)
  })
})
