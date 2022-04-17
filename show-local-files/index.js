// Grab any variables you need
const react = Spicetify.React;
const reactDOM = Spicetify.ReactDOM;
const {
    URI,
    React: { useState, useEffect, useCallback },
    Platform: { History },
} = Spicetify;

function render() {
  if (!History) {
    setTimeout(() => {
      return render()
    }, 50)
  }

  History.push('/collection/local-files')
	return null
}