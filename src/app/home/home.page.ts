import { Component } from '@angular/core';
import { AuthenticateService } from '../services/auth.service';
import { CrudService } from '../services/crud.service';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private _authenticate: AuthenticateService,
    private _crudService: CrudService,
  ) {
  }

  isLoading = true
  alunos = []
  getData() {
    fetch('http://pokeapi.co/api/v2/pokemon/pikachu')
      .then(dados => dados.json())
      .then(dados => console.log(dados))
      .catch(_ => console.log(_))
      .finally(() => this.isLoading = false)
  }

  criarConta(dados: any) {
    this._authenticate.register(dados.email, dados.password)
  }

  realizarLogin(dados: any) {
    this._authenticate.login(dados.email, dados.password)
  }

  inserirAluno(dados: any) {
    const aluno = {
      nome: dados.nome,
    }
    this._crudService.insert(aluno, 'alunos')
  }

  listarAluno() {
    this._crudService.fetchAll('alunos')
      .then(alunos => {
        this.alunos = alunos
      })
  }

  consultarAluno(dados: any) {
    this._crudService.fetchByOperatorParam('nome', '==', dados.nome, 'alunos')
      .then(aluno => {
        aluno.forEach((element: any) => {
          console.log(element)
        });
      })
  }

  atualizarDados(dados:any){
    this.consultarAluno(dados.nome)
    console.log(al)
  }
}
