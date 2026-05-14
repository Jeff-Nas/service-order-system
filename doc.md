## Tipagem

- A estrutura do contrato do formulário `OSFormData` foi alterada para se adequar ao useFieldArray.A estrutura que, antes era plana, passou a ter array de objeto. Como:

```typescript
parts: {
  partNumber: string;
  quantity: number;
  unitValue: string;
  partDescription: string;
}
[];
```

## Desafios

### BUG no componente evidencesField

No componente `evidencesField.tsx` foram idenficados alguns [[bugs]], sendo um deles relacionado ao race condition.

- Race Condition: A Race Condition (ou condição de corrida) é um bug que ocorre em sistemas de software ou hardware quando múltiplos processos ou threads tentam acessar e modificar o mesmo recurso compartilhado ao mesmo tempo.

Esses foram alguns erros que se manifestaram no mobile durante os testes (desktop não apresentou erro ainda):

- A imagem é selecionada mas o card fica em branco
- múltiplas imagens quebram (mesmo erro anterior) (obs: mutiple desabilitado)
- PIOR DE TODAS: a página recarrega e apaga todo o form (ainda não persisti os dados)

O `label` foi substituido pelo `button + ref` pelo seguinte motivo:

Em browsers móveis (Safari/WebKit especialmente), um `<label> com <input type="file">` dentro, quando está dentro de um <form>`, pode disparar o submit do form em certas condições de toque. O form submita, a página recarrega, tudo some.
