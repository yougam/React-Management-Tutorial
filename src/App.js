import React, {Component} from 'react';
import Customer from './components/Customer';
import './App.css';
import { importDefaultSpecifier } from '@babel/types';

const customers = [
  {
  'id': 1,
  'image': 'https://placeimg.com/64/64/any',
  'name': '홍길동',
  'birthday': '19800516',
  'genter': '여자',
  'job': '회사원'
  },
  {
    'id': 2,
    'image': 'https://placeimg.com/64/64/1',
    'name': '아이야',
    'birthday': '19800516',
    'genter': '남자',
    'job': '개발자'
  },
  {
    'id': 3,
    'image': 'https://placeimg.com/64/64/2',
    'name': '아지댜',
    'birthday': '19800516',
    'genter': '남자',
    'job': '디자이너'
  }   
]

class App extends Component {
  render(){
    return (
      <div>
        {
          customers.map( c => {
            return (
              <Customer 
                key={c.id}
                id={c.id}
                image={c.image}
                name={c.name}
                birthday={c.birthday}
                genter={c.genter}
                job={c.job}
              />
            )
          })
        }
        
      </div>
    );
  }
}

export default App;
