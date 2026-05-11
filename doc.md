- A estrutura do contrato do formulário(``OSFormData`) foi alterada para se adequar ao useFieldArray.A estrutura que, antes era plana, passou a ter array de objeto. Como:

```typescript
parts: {
  partNumber: string;
  quantity: number;
  unitValue: string;
  partDescription: string;
}
[];
```
