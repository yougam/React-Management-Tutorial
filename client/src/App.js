import React, {Component} from 'react';
import Customer from './components/Customer';
import './App.css';
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { async } from 'rxjs/internal/scheduler/async';


const styles = theme => ({
  root: {
    width : '100%',
    marginTop: theme.spacing.unit * 3,
    orverflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
})

/*
const customers = [
  {
  'id': 1,
  'image': 'https://placeimg.com/64/64/any',
  'name': '홍길동',
  'birthday': '19800516',
  'gender': '여자',
  'job': '회사원'
  },
  {
    'id': 2,
    'image': 'https://placeimg.com/64/64/1',
    'name': '아이야',
    'birthday': '19800516',
    'gender': '남자',
    'job': '개발자'
  },
  {
    'id': 3,
    'image': 'https://placeimg.com/64/64/2',
    'name': '아지댜',
    'birthday': '19800516',
    'gender': '남자',
    'job': '디자이너'
  }   
]
*/
class App extends Component {
  state = {
    customers: "",
    completed: 0
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20)
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const {completed} = this.state;
    this.setState({ completed: completed>=100 ? 0 : completed + 1});
  }

  render(){
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
            this.state.customers ?this.state.customers.map(c => {
              return (<Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />)
            }) :
            <TableRow>
              <TableCell colSpan="6" align="center" >
                <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
              </TableCell>
            </TableRow>            
          }
            
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles) (App);
