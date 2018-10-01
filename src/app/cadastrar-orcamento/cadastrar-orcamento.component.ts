import { Component, OnInit } from '@angular/core';
import { OrcamentosService } from '../orcamentos.service';
import { ActivatedRoute } from '@angular/router';
import { equal } from 'assert';

@Component({
  selector: 'app-cadastrar-orcamento',
  templateUrl: './cadastrar-orcamento.component.html',
  styleUrls: ['./cadastrar-orcamento.component.css']
})
export class CadastrarOrcamentoComponent implements OnInit {
  orcamento = null;
  nome: String;
  email: String;
  mobilia_id: Number;
  mobilia_tipo: String;
  mobilia_puxador: String;
  mobilia_pintura: String;
  mobilia_largura: Number;
  mobilia_altura: Number;
  mobilia_profundidade: Number;
  mobilias = [];
  mostrar_mensagem = false;
  total_orcamento = 0.0;
  

  constructor(private orcamentosService: OrcamentosService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.orcamento = this.orcamentosService.encontrar(Number.parseInt(id));
  }

  adicionarMobilia() {
    this.mobilias.push({
      id: this.mobilias.length + 1,
      tipo: this.mobilia_tipo,
      puxador: this.mobilia_puxador,
      pintura: this.mobilia_pintura,
      largura: this.mobilia_largura,
      altura: this.mobilia_altura,
      profundidade: this.mobilia_profundidade
    });
    this.mobilia_tipo = null;
    this.mobilia_puxador = null;
    this.mobilia_pintura = null;
    this.mobilia_largura = null;
    this.mobilia_altura = null;
    this.mobilia_profundidade = null;
  }

  salvar() {
    let orcamento = {
      id: null, // setando null no id aqui só para deixar ele sempre no inicio do objeto.
      nome: this.nome,
      email: this.email,
      pecas: this.mobilias
    };
    this.orcamentosService.salvar(orcamento);
    this.nome = null;
    this.email = null;
    this.mostrar_mensagem = true;
    this.mobilias = [];
    this.total_orcamento = 0.0;
  }

  mostrar_total() {
    let orcamento = {
      nome: this.nome,
      email: this.email,
      pecas: this.mobilias
    };
    this.total_orcamento = this.orcamentosService.calcular(orcamento);
  }

  remover(mobilia){
    if (confirm(`Tem certeza que deseja excluir a peça de mobilia?: ${mobilia.tipo} ?`)) {
      this.mobilias.splice(this.mobilias.find(m =>  m.id == mobilia.id), 1);
    }
  }
}
