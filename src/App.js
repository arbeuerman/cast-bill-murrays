import React, { Component } from 'react';
import BillCollection from './components/BillCollection';
import BillsCast from '././components/YourCast';

const billsUrl = 'http://localhost:3000/bills';
const headers = {
  'Content-Type' : 'application/json',
  Accepts: 'application/json'
}

class App extends Component {
  
  state = {
    bills: [],
    cast: [ ]
  }

  componentDidMount() {
    fetch(billsUrl)
    .then(res => res.json())
    .then(bills => this.setState({bills}))
  }

  handleBill = (billToChange, isCast) => {
    fetch(`${billsUrl}/${billToChange.id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({cast: isCast})
    })
    .then(res => res.json())
    .then((updatedBill) => this.setState({bills: this.state.bills.map(bill => bill === billToChange ? updatedBill : bill)}))
    .catch(err => console.error(err));
    
  }
  addBillToCast = (castedBill) => {
    this.handleBill(castedBill, true);
  }

  removeBillFromCast = (billToRemove) => {
    this.handleBill(billToRemove, false);
  }

  fireBill = (billToFire) => {
    fetch(`${billsUrl}/${billToFire.id}`, {
      method: 'DELETE',
      headers
    })
    .then(() => this.setState({bills: [...this.state.bills.filter(bill => bill !== billToFire)]}))
    .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        <BillsCast cast={this.state.bills.filter(bill => bill.cast)} removeBill={this.removeBillFromCast} fireBill={this.fireBill} />
        <BillCollection bills={this.state.bills} addBill={this.addBillToCast} fireBill={this.fireBill} />
      </div>
    );
  }
}

export default App;
