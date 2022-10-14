import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { LocalStorageService } from "src/app/auth/services/local-storage.service";
import { environment } from "src/environments/environment";
import { FormsContatoViewModel } from "../view-models/forms-contato.view-model";
import { ListarContatoViewModel } from "../view-models/listar-contatos.view-models";
import { VisualizarContatoViewModel } from "../view-models/visualizar-contato.view-model";

@Injectable()
export class ContatoService {
  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
    ) {}

  public inserir(contato: FormsContatoViewModel): Observable<FormsContatoViewModel> {
    const resposta = this.http
      .post<FormsContatoViewModel>(this.apiUrl + 'contatos', contato, this.ObterheadersAutorizacao())
      .pipe(map(this.processarSucesso), catchError(this.processarFalha));

    return resposta;
  }

  public editar(contato: FormsContatoViewModel): Observable<FormsContatoViewModel> {
    const resposta = this.http
      .put<FormsContatoViewModel>(this.apiUrl + 'contatos/' + contato.id, contato, this.ObterheadersAutorizacao())
      .pipe(map(this.processarSucesso), catchError(this.processarFalha));

    return resposta;
  }

  public excluir(id: string): Observable<string> {
    const resposta = this.http
      .delete<string>(this.apiUrl + 'contatos/' + id, this.ObterheadersAutorizacao())
      .pipe(map(this.processarSucesso), catchError(this.processarFalha));

    return resposta;
  }

  public selecionarTodos(): Observable<ListarContatoViewModel[]>{
    const resposta = this.http
      .get<ListarContatoViewModel[]>(this.apiUrl + 'contatos', this.ObterheadersAutorizacao())
      .pipe(map(this.processarSucesso),catchError(this.processarFalha))

    return resposta;
  }

  public selecionarPorId(id: string): Observable<FormsContatoViewModel> {
    const resposta = this.http
      .get<FormsContatoViewModel>(this.apiUrl + 'contatos/'+ id, this.ObterheadersAutorizacao())
      .pipe(map(this.processarSucesso), catchError(this.processarFalha));

    return resposta;
  }

  public selecionarContatoCompletoPorId(id: string): Observable<VisualizarContatoViewModel> {
    const resposta = this.http
      .get<VisualizarContatoViewModel>(this.apiUrl + 'contatos/visualizacao-completa/' + id, this.ObterheadersAutorizacao())
      .pipe(map(this.processarSucesso), catchError(this.processarFalha));

    return resposta;
  }

  private ObterheadersAutorizacao(){
    const token = this.localStorageService.obterTokenUsuario();
    return{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }
  }

  private processarSucesso(resposta: any){
    if(resposta?.sucesso)
      return resposta.dados;
    else
      return resposta;
  }

  private processarFalha(resposta: any) {
    console.log(resposta)
    return throwError(() => new Error(resposta.error.erros[0]));
  }
}
