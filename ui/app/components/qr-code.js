const Component = require('react').Component
const h = require('react-hyperscript')
const qrCode = require('qrcode-npm').qrcode
const inherits = require('util').inherits
const connect = require('react-redux').connect

module.exports = connect(mapStateToProps)(QrCode)

function mapStateToProps (state) {
  return {}
}

inherits(QrCode, Component)

function QrCode () {
  Component.call(this)
}

QrCode.prototype.render = function () {
  const props = this.props
  const content = props.content
  const qrImage = qrCode(4, 'M')
  qrImage.addData(content)
  qrImage.make()

  return h('#qr-container.flex-column', {
    style: {
      marginTop: '25px',
      marginBottom: '15px',
    },
    dangerouslySetInnerHTML: {
      __html: qrImage.createTableTag(4),
    },
  })
}
