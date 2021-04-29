import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'books',
    title: 'Livros',
}

const baseUrl = 'http://localhost:3000/books'
const initialState = {
    book: { name: '', authorName: '', price: '' },
    list: []
}

export default class BookCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ book: initialState.book })
    }

    save() {
        const book = this.state.book
        const method = book.id ? 'put' : 'post'
        const url = book.id ? `${baseUrl}/${book.id}` : baseUrl
        axios[method](url, book)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ book: initialState.book, list })
            })
    }

    getUpdatedList(book, add = true) {
        const list = this.state.list.filter(u => u.id !== book.id)
        if (add) list.unshift(book)
        return list
    }

    updateField(event) {
        const book = { ...this.state.book }
        book[event.target.name] = event.target.value
        this.setState({ book })
    }

    renderForm() {
        return (

            <div className="form">
                <p>Adicione ou edite um livro</p>
                <div className="card shadow p-3 mb-5 bg-white rounded">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6 col-sm-12">
                                <div className="form-group">
                                    <label>Nome</label>
                                    <input required type="text" className="form-control"
                                        name="name"
                                        value={this.state.book.name}
                                        onChange={e => this.updateField(e)}
                                        placeholder="Digite o nome..." />
                                </div>
                            </div>

                            <div className="col-6 col-sm-12">
                                <div className="form-group">
                                    <label>Nome do autor</label>
                                    <input required type="text" className="form-control"
                                        name="authorName"
                                        value={this.state.book.authorName}
                                        onChange={e => this.updateField(e)}
                                        placeholder="Digite o nome do autor..." />
                                </div>
                            </div>

                            <div className="col-6 col-sm-12">
                                <div className="form-group">
                                    <label>Preço</label>
                                    <input required type="number" className="form-control"
                                        name="price"
                                        value={this.state.book.price}
                                        onChange={e => this.updateField(e)}
                                        placeholder="Digite o preço..." />
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-12 d-flex justify-content-end">
                                <button className="btn btn-small btn-primary"
                                    onClick={e => this.save(e)}>
                                    Salvar
                                </button>

                                <button className="btn btn-small btn-secondary ml-2"
                                    onClick={e => this.clear(e)}>
                                    Cancelar
                                 </button>
                            </div>
                        </div>
                        <div>
                        <i style={{color: '#979779' font-size: 25}} className="fa fa-arrow-down"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    load(book) {
        this.setState({ book })
    }

    remove(book) {
        axios.delete(`${baseUrl}/${book.id}`).then(resp => {
            const list = this.getUpdatedList(book, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <div className="card shadow p-3 mb-5 bg-white rounded">
                <div className="card-body">
                    <table className="table mt-4">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Nome do autor</th>
                                <th>Preço</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderRows()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    renderRows() {
        return this.state.list.map(book => {
            return (
                <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.name}</td>
                    <td>{book.authorName}</td>
                    <td>{book.price}</td>

                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(book)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(book)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}