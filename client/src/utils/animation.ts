export function staggerAdd(source: any[], target: any[], delay: number = 25) {
  source.forEach((item, index) => {
    setTimeout(() => {
      target.push(item);
    }, index * delay);
  });
}
