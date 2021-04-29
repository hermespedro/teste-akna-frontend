import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import BookCrud from '../components/books/BookCrud'

export default props => 
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/books' component={BookCrud} />
        <Redirect from='*' to='/' />
    </Switch>