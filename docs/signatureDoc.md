## Documentação — Substituição do `react-signature-canvas` pelo `signature_pad`

---

### Por que a biblioteca foi substituída

O projeto utilizava `react-signature-canvas`, um wrapper React em torno da biblioteca original `signature_pad`. Durante o desenvolvimento, a versão instalada apresentou um erro fatal no ambiente Vite:

```
Uncaught TypeError: (0 , import_build.default) is not a function
```

Esse erro indica um conflito de bundling — o Vite não conseguiu resolver corretamente o módulo interno do wrapper, tornando o componente completamente inoperante. Como o `react-signature-canvas` é apenas uma camada fina sobre o `signature_pad` original, a solução foi remover o wrapper e usar a biblioteca base diretamente, eliminando a dependência problemática e a camada de indireção desnecessária.

---

### Como o componente foi reescrito

Sem o wrapper React, o `signature_pad` é inicializado manualmente via `useEffect` sobre um elemento `<canvas>` nativo:

```
react-signature-canvas    →    signature_pad
componente React pronto   →    instância criada no useEffect
prop onEnd                →    evento "endStroke"
ref com métodos prontos   →    padRef com instância direta
```

---

### O problema do canvas CSS e a solução com ResizeObserver

Esse é o ponto mais importante da implementação.

Um elemento `<canvas>` tem dois tamanhos distintos e independentes: o tamanho CSS (visual, controlado por classes como `w-full h-full`) e o tamanho interno em pixels (controlado pelos atributos `width` e `height` do elemento). Por padrão, todo canvas nasce com `300x150px` internamente, independente do que o CSS define visualmente.

O `signature_pad` usa as coordenadas internas para registrar os traços — não as visuais. Quando esses dois tamanhos divergem, o ponto de contato e o traço desenhado ficam deslocados, que foi exatamente o comportamento observado.

A solução foi sincronizar os dois tamanhos no momento em que o canvas é renderizado:

```ts
const rect = canvas.getBoundingClientRect(); // tamanho CSS real
canvas.width = rect.width * devicePixelRatio; // atributo interno
canvas.height = rect.height * devicePixelRatio;
```

O `devicePixelRatio` entra para suportar telas de alta densidade (Retina, displays Android modernos) — sem ele, o canvas renderiza na metade da resolução esperada, deixando os traços borrados.

O `ResizeObserver` monitora mudanças no tamanho do canvas em tempo real e re-executa essa sincronização automaticamente, cobrindo casos como rotação de tela e abertura do teclado virtual — problema que no componente anterior era tratado com a prop `clearOnResize={false}`, aqui resolvido de forma mais robusta preservando o desenho existente após cada redimensionamento.
