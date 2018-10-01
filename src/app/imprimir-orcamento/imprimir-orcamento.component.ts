import { Component, OnInit } from '@angular/core';
import { OrcamentosService } from '../orcamentos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-imprimir-orcamento',
  templateUrl: './imprimir-orcamento.component.html',
  styleUrls: ['./imprimir-orcamento.component.css']
})
export class ImprimirOrcamentoComponent implements OnInit {
  orcamento = null;

  constructor(private orcamentosSevice: OrcamentosService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(localStorage.length > 0){
      this.orcamento = this.orcamentosSevice.encontrar(id);
      this.orcamentosSevice.calcular(this.orcamento);
    }else{alert("No momento não tem nenhum orçamento cadastrado!")}
    //this.orcamento = JSON.parse(localStorage.getItem(id)); está linha é a mesma que está dentro da função 
    //encontrar(), fiz uso da mesma para manter o padrão, ela seria melhor utilizada se etivessemos salvando mais 
    //do que um tipo de ojeto e sendo assim estariamos enviando as listas dos objetos para o localStorage, dessa 
    //forma teria uma busca na lista de ojetos, logo esta logica de busca estaria na função encontrar() dentro do 
    //serviço.
  }
  
}
