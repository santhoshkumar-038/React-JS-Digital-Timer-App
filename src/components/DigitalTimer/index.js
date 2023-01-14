import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    timerLimitInMinutes: 25,
    timerElapsedInSeconds: 0,
    isTimerRunning: false,
  }

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.timerId)

  elapsedMinutesAndSeconds = () => {
    const {timerLimitInMinutes, timerElapsedInSeconds} = this.state
    const remainingSecondsLeft =
      timerLimitInMinutes * 60 - timerElapsedInSeconds
    const minutes = Math.floor(remainingSecondsLeft / 60)
    const seconds = Math.floor(remainingSecondsLeft % 60)
    // console.log(minutes)
    // console.log(seconds)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  renderTimerImage = () => {
    const {timerLimitInMinutes, isTimerRunning} = this.state
    // console.log(isTimerRunning)
    const statusLabel = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="timer-image">
        <div className="time-container">
          <h1 className="timer">{this.elapsedMinutesAndSeconds()}</h1>
          <p className="timer-status">{statusLabel}</p>
        </div>
      </div>
    )
  }

  onClickDecreaseButton = () => {
    const {timerLimitInMinutes} = this.state
    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onClickIncreaseButton = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  decreaseMinutesAndSeconds = () => {
    const {timerElapsedInSeconds, timerLimitInMinutes} = this.state
    const isTimerCompleted = timerElapsedInSeconds === timerLimitInMinutes * 60
    if (isTimerCompleted) {
      console.log('time completed')
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timerElapsedInSeconds: prevState.timerElapsedInSeconds + 1,
      }))
    }
  }

  onClickResetButton = () => {
    this.clearTimerInterval()
    this.setState({
      timerLimitInMinutes: 25,
      timerElapsedInSeconds: 0,
      isTimerRunning: false,
    })
  }

  onClickStartButton = () => {
    const {
      isTimerRunning,
      timerLimitInMinutes,
      timerElapsedInSeconds,
    } = this.state
    const isTimerCompleted = timerElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timerElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.timerId = setInterval(this.decreaseMinutesAndSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderButtonsSection = () => {
    const {
      timerLimitInMinutes,
      isTimerRunning,
      timerElapsedInSeconds,
    } = this.state
    const disableButton = timerElapsedInSeconds > 0
    // console.log(timerLimitInMinutes)
    // console.log(timerElapsedInSeconds)
    const changingAltStatus = isTimerRunning ? 'pause icon' : 'play icon'
    const changingImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    return (
      <div className="button-controls-container">
        <div className="start-reset-button">
          <div className="start-button">
            <button
              type="button"
              className="start-pause-button"
              onClick={this.onClickStartButton}
            >
              <img
                src={changingImageUrl}
                alt={changingAltStatus}
                className="start-button-image"
              />
              <p className="pause-start-button-text">
                {isTimerRunning ? 'Pause' : 'Start'}
              </p>
            </button>
            <button type="button" className="start-pause-button">
              <img
                src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                alt="reset icon"
                onClick={this.onClickResetButton}
                className="reset-button-image"
              />
              <h1>Reset</h1>
            </button>
          </div>
          <p className="set-timer-text">Set Timer limit</p>
        </div>
        <div className="increase-decrease-container">
          <button
            type="button"
            className="decrease-button"
            disabled={disableButton}
            onClick={this.onClickDecreaseButton}
          >
            -
          </button>
          <div className="set-minutes-container">
            <p>{timerLimitInMinutes}</p>
          </div>
          <button
            type="button"
            className="increase-button"
            disabled={disableButton}
            onClick={this.onClickIncreaseButton}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="app-container">
        <div className="timer-app-container">
          <h1 className="timer-heading">Digital timer</h1>
          <div className="digital-timer-container">
            {this.renderTimerImage()}
            {this.renderButtonsSection()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
