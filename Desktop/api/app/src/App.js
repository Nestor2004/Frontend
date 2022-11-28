import React from 'react';
import logo from './logo.svg';
import './App.css';
 

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      rates: []
    };
  }

  componentDidMount() {
    fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Примітка: важливо обробляти помилки саме тут,
        // а не в блоці catch (), щоб не перехоплювати
        // виключення з помилок в самих компонентах.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {

    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Помилка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Завантаження...</div>;
    } else {
      return (
        
        <table>
          <tr>
          {items.map(item => (
            <tr key={item.txt}>
              <th>{item.txt}</th>
              <th>{item.rate}</th>
              <th>{item.cc}</th>
              <th>{item.exchangedate}</th>
            </tr>
          ))}
          </tr>
      </table>
      );
    }
  }
}
export default App;
