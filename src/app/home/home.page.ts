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
  isLoading: boolean = false;

  alunos = [];

  nome = 'Joaozinho';

  aluno = {
    nome: null,
    idade: null,
    ra: null,
    id: null
  }

  public file: any = {};

  constructor(
    public _authenticate: AuthenticateService,
    private _crudService: CrudService,
    public storage: Storage,
    private _message: MessageService
  ) { }

  criarConta(dados: any){
    this._authenticate.register(dados.email, dados.password)
  }

  realizarLogin(dados: any) {
    this._authenticate.login(dados.email, dados.password);
  }

  inserirAluno(dados: any){
    this.aluno.nome = dados.nome;
    // this.aluno.idade = 10;
    // this.aluno.ra = 321321;

    this._crudService.insert(this.aluno, 'alunos');
  }

  listarAlunos(){
    this._crudService.fetchAll('alunos')
    .then( alunos => {
      this.alunos = alunos;
    })
  }


  removerAluno(aluno: any){
    console.log(aluno);
    this._crudService.remove(aluno.id, 'alunos')
  }

  consultarAluno(dados: any){
    console.log(dados);
    this._crudService.fetchByOperatorParam('nome', '==', dados.nome, 'alunos')
    .then( aluno => {
      console.log(aluno[0].id);
    })
  }

  atualizarDadosAluno(dados: any){
    if (this.aluno.id == null) {
      this._crudService.fetchByOperatorParam('nome', '==', dados.nome, 'alunos')
      .then( aluno => {
        this.aluno = aluno[0];
        console.log(this.aluno);
      })
    } else {
      this._crudService.update(this.aluno.id, dados, 'alunos');
    }
  }
}
