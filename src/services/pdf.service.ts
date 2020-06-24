import { Request, Response } from 'express';
import ResponseModel from '../models/ResponseModel';
import PdfPrinter from 'pdfmake';

export class PdfService {
  public create(req: Request, res: Response) {

    var fonts = {
      Roboto: {
        normal: 'resources/fonts/Roboto/Roboto-Regular.ttf',
        bold: 'resources/fonts/Roboto/Roboto-Medium.ttf',
        italics: 'resources/fonts/Roboto/Roboto-Italic.ttf',
        bolditalics: 'resources/fonts/Roboto/Roboto-MediumItalic.ttf'
      }
    };

    let printer = new PdfPrinter(fonts);

    /* data coming from external service */
    /* first row */
    /**  header left - data */
    let logoImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAggAAABkCAYAAADjVchrAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH5AYYDDAXDmMztAAAIABJREFUeNrtnXl8W8W1x39nruQti03CvrWFtCGEOJLNloJBvjaBBBJCW1lK0lDWlNIHLYVS9ppCaWlZXqF9FGh4gSyWrD4ISalpsGVBCAFSW3IWKBDKvgRiYjubLevOeX/YoSwJvrZH9rU138/HkDjS3Lnnnjnzm7kzZwgajYOYMsWf25GDoyUZk4jkEZC0PxEOkEz7CuL9JOAmoAAAdf8UfObruwC0d/85BeBjgD5mYDOBPwLTRxB42UWicW3t0jcAsJ06eUorThJEC+x8ti27bfKmmpoOACj0BY4RAo/3xx4ESJeLzLUrQ++ky+YeMxgG+Nh+1PK5RDQ0DwCKy/35lhSNqutIgASotfuvSTDv6PoH+hgkPwaj+znTu5Z0rV8XW/Jub8r3moGnCTjAzmelpDMSsdCb9mwbuBXAbPs14SajtSDQ0PBAZ1qedWngbBDu6oXdLWY+P1FfvVpHp8zDpU2gGWyKzUCRxQgQYWY78E0ABoEBJoC6enEi7vr/VxeV2/2zm/0A/s93iAEGUmzBawbeA2gFs1zcU/BjohEMjLdzL/u1jBSbdjcuktkMcUR/7ZOy5FUAfpIO23vNilMAruhfKfzG7j8l293ClWUdkR5P4c/1XJ/+julzvzJECl4z2AxwgpieYBfC8adC7/dQ+DgGDrYlEMjKtlvjzrHyV1nN4kQAZTa75CNkQdufAVyo2nqTy4NekrwEwAj7JqefJOrDWhxkKEKbQDNYFJmzTa8ZaJJAAxGuBnAUAGOALn8IwJcQ0bPessAary94rGMNxTS/uOT7B6UpBPx2eHoXjwVQxsR3weJ3vGZgeWGpf/xA12JjJJLMynZ9B8A6+1XnCzxm8CqlQvC04MFCyuW9EQcEujleH7pHRyotEDSagRUHpcErGPIpAIWD35fgRAhe4ykNXOpQc+VId+flymcPSoMzAZ6SIXFuhkGi0WMG/AN98RdqlrRJyOlg2H5NRODbi8zgOSquP9HnHwnJTwB0qH1Nigcao6FKHam0QNBoBnjmIHgOE9/pMP9zEeGPXjM4z6Fmu3TSyXP2UVZaZaWA4JszzPXyCFjqKa2YPtAXbopG3rMY0wG02o3NDF5SXBo8ob/POcsQi8Hw9EIxLy+wNv9YRyqNFgiaAWWi35/FzH9Aj8sJBgUC+J7CqfP2d2DdRrvc8r9UFeZ5+l/B3nUawwYXET1c7Ju970BfeF0svEESnwMgafMruVLIx4rL/Yf3WYw/8/JdYJzdi688ky/zArFYLKWjlUYLBM2Akr1FnAXCYQ6uYoHoTF7pyJoR/3T8STNH9bcYv99vCOKbMtgN92XB/zUYF26qq65nwgWwuYMGTAdJKf5eXO7P77UINAMXcS8WtxKwIZU0ZsViC9t1pNIAeheDZoCRYJN6OXnAwL8F8IxkfhUC74NpJwHbIbiTLN4KAJag0YJgkEWjJcEg5lFMOAwQ4whcCuAQ24GScA6AXzjQfGPycnLmA7izP4W8vsW4kInHO+B+PgRjQy9FkgBEPsB5YOSAcACAvN5emCEvBHCz7Y5aIYm68JIiM/hNBv/S5lcmSotCPp9vht2RfVFpxekM3NcLg7xjuGl6Y3TpVh2lNFogaAZnECzo0F6E5C1gCibqQ3X9uabP53O10AG/7t4pYYdvTvT5R26MRbYPoGls7OIEAFzp8533p76O8ny+83JaaeeNNt/wSKR3ljEarw/P7W8hx00NHtaZkmcQ6FcADrTpiYcWl/uPaaiNrB+MdtAYDd3sMQOHE3C+TdV6RqvY/07YmBHwlvmPZqZQL+L7FsFi6tqVVe/oCKX5LPoVg2ZgYXt7zQGAia+K91McAEAsFkslTp1wLYCX7X4nL8vYZ0DtQnjUplEOaqFdF/T1Mq3GrkttrWYn/gDAkNj/vnZl6J1EtPpBlnJat6ixhZTGYK7BYKM1/4cg/MP+N+hyrxm47CvFks9/IFj8HZ9PIPZV7ATJmQ2xqn/p4KTRAkEz2GTZdk6L1XVQlZWSwU/a/biVtJ8MR0lvYclbGdhmT0vgmol+f1ZvrzHR5x8JZnuvTphuAWHnUHKsRCySAOif9jUZjhzM+jY0PNC5s32Xn4B4L752d9f21C8zZYo/N2WIxwB8zWZZnQC+F6+LrNFhSaMFgsYJtNke4QEjlTo7iRfAqLXzw25jQDtHFviYQH+w2bMd5m425vRamRniZwDZ2aHxVnKsXDAkvYvY9kiYmUcNdnVfWb18G3W6zwTwls2vGEy82FsamPzFO2/PNRaAcaLt2wfNj0fDNTokafaGXoOgGVgYr4JQYrNHPxtAQtWlG+tCYQBhx6p1Yd0hpfGj7iyAPWgEvt7v9y+KRCKWnbInnTxnH7B1hc2R9c0bI5GktywwFBVCyva6Q0KWE2rcsGrxB94y/3SweBbAPjaezygQ/l7om3vC7jMnvGbFbwC2f+YD8c8TdeGFOiBp9AyCxkkK4TnbMQx0rdesuGGy6T++L1PqQ42G2kgrM99u8+PjXt9C37Vbtjvbuhb23ku/NlpuXjR03Ut+3X4nSducUu14XeQlgGcB6LD5lYMNkXq8cOq8EUVm4HyAbO+6Ycbv4nXVd0Kj0TMIGkcpUjaWS5K78PlDlfZGNkC3CNAtWc1o95iB9wm0tYfot/XzfQC2gvAxS2wBYQszNTNZm1wj2jc0rFjhuHfsBZx7byvtvNzOQkImug5ABD0MmYtLvn+Q5E6bmfH4l0M1Sc4J0+aO7uhIHWd7E63Eh06qfzxa/YzXrDgfoCWwt82kyEgl/8HA8b24zKJEffgaHYk0WiBonDdKjlVt8ZiB+wn4aS+/mkPAET1OH38hrPLu/9BuwcAgCMgdeZbXDGwAUMOERxN14bVOsE8strC9qCxwKzP+bOPjk4vKAmc21oX/9pX9oLvzRtjLFbAxfsrRYUSHnl/5/X5jU3PqjwTYXldAkK847T7i0eoqrxk8HGC7h2idZH92BbXJfeVFGITcDxotEDQaewM3V9YNRip5GoCJg1gNA8BkAJOJcY23LPA8E12bqA3FBts+o63NC9rEAVfYOWJaMm4AsFeB4PEFvw6wraODmfgGVFbKoeBDE33+kQayClyGHAOWp2xqpvMALu5FEckOZkdu44xHQ7d7zcAhAC5TWOzaJMtzNkYiSR2BNFogaBzLupWLdhzn85enDLECDGccs8w4kZijXjNwezwavnZwZxFiKa9ZcTNAS3seBeOEInO22Rit2uO4nwT/Cra2llJDoi78+ADf6hyvGZjT96+nwPyfB9grCDUDnAirdyLhlAk/9Tzz0qEEUnGi4ybLlXXWxpWLtuvoo+kNepGiZlBYG4t8KFryv82MqwH+yCHVIgDXeM2KGwZ/FFkdsrs/nmFdv6ffTy6dPRGArQ6YiG5A5kw9syB5h6NrWFkpc3fxXID6m6PgfZZ02rqViz6CRqMFgmao0NDwQGeiPvz7fPnRIQCfCvDtAD+Frj3hg9hZUWVxuX/SYHdikulGm/U1PaUVJ32507duQderlJ5Y3VhX9WSm+B0THmyojTzr9HquWRPZJSTNBPBqH4toBWN6IhZ6U0cbTV/Qrxg0g073qvlnun8AAIVT540gK3mIgBzL0hhDhDHEyAUwgnfvX2dkgeSIPY+qKRtAPhEmgTEZgLsXVTIki1sAzBpMuyTqQ094zeDTXeKpxymAawDM2P1Xry94bPe2uR6RxDdmkLvVdI6Rlw2VyjbEqrYUm4HpEvyczSRXu9lFRDMao6EmHWE0WiBohhXrVi7a0Y+R0+cYN21a9sj2/HIQ39O1E8LOMBOnF06dN6K7HoOGENYNUopVPeoD4KxiM1DUEA03dn1R3gYQ2bjP2qZodX0GuFQSoN/lyw9vjkWG1jbOhmj4dW+ZfxaYogBy7HgvM2bHo6FVOpJo+hV/tAk0w51NNTUdifrQE5BUBqDV5tdyjM72QV9A2T0VbisdrtWdLKeoLFgC0Gn2IoC8aZg//o3MfJ3LRePi0dCNQzXHQ/d5CXYFc0eifsAXnGr0DIJG0z+KSoPzmWykkyVqUv1ePBELvek1g1UAX2JrEkHQPk6wGZG4hlme3pOgJ/D3Ckv945nt7aFn4G+J4XFQzw4AHwDYDPAHIFpPQKPFMt4UjbynW51GowWCZgjAhNvsnDXALP8KQP3COZKbwPZy7RGEI9pHY13VOq8ZqAYQ7Gk+wCDxKICj7TwKFjTIswf8FDH3aktpikVHtqvrIC3iXa3txsj2wX4NpNFogaDRqOkU8ux9rlcLsuzrAxaj2OYGCQnZ7BirGcZNZFnfRc+LLY+2WeL/NdWG44N6TxBb4/WhBt0mNBpnotcgaAaaT+x1HvAWz5iRp/jaxMBU2x2YRR87xWiJp5a+RqCFioqToiuBkkaj0egZBI1ToLcBPqTHTwGj5I68B4tnzLhY0aFK5DErbgJ4ik2Bsm0MNv/LSZZjA5WwMBf2zlX4KpY01EbWa1/sG4YQ13nLKlrSdgEplsfrQ3Xa0hotEDQZBYOjBEyx+fE5ckfedK8ZeJKJ1guJLSy4jRnWVyiLLCFpBJMUgMjv+hUfxEApgMJeVPVpp614jz8Vet9rBu4DcGU/irEslr/WntgvJz7X3mGLfZWy/AEALRA0WiBoMm30JcNSimth//VWAYAgMQeZuob21MPQn2n38Y28+1e9RhDud6L93JT8TSdnXQxgdJ/6HtBD6+ojr2hP1Gg0PcZBbQLNQNJQG1nPNg4hGtQBItOzPR2hPFi8WPdYMwh39vHryZTL+o32Qo1GowWCxpHs6th5KUDOXL3OeMftxhwn2y9pybsAbO7DV+9ftzLyhvZAjUajBYLGkbyyevm2pNuayqBqR1WM8LzLMHxrV4becbL9NsYi2wn4bS+/1i4hb9fep9FotEDQOJqN/4h8koiGAmAqJ2Al8BULD9PPehBdNG6MPHlt7dJ/DwX7dYyV/wOG7dkAItyrswpqNJreoBcpagaV7u1cdd4S/36cRdNJ0hQmeAg4EsCYNIjYTgBvEPCSBK0m5qfi9eEmAIgPIbttjESS3tKKWwFaYOPj21NG1h3a2zQajRYImqEnFFZFPgbwcPfPpxxfds7YpMgdIzqtsezikWBRwGwjVzLzDjKQlAzLkNxmGO6tqY7ObWLnPi0NDQ909qZuMmmsRXbKtPPZNadP7MCaCADAnZP1WrKz09ahSTvc27f01mbj9uWHN23F2z2aIsVb1q1c9FFvy5dE1wqSPQoLIenT5FdZu0Zulzkttu7ZgNzsFP9j5gpBRrYT6kIitWmPv5f4Ibt4ZI/fl4bUEUWj0Wg0Go1Go9FoNBqNRqPRaDQajUaj0Wg0Go1Go9FoNBqNRqPRaDQajUYzdFB2JNn4k2aOynVnHykMcShAIyCRP1A3IUkyQC2CuU2S2GYIa5tI4eO1sciHQ+2B+Hw+1xbjoLG5RCMAIMmWy7AwhgX2YaZ9BLCXbU6yRRJ96VwiYpYw0AoAZPFWAJAud5ubYe1i3kEdlBxpdbavWRPZNRD35zErLhYsaMAMavCqxtrwywP5DIvNwJHMVNbfclJs/H1dbMm7u/8+uTzoNSwcN2A3IuTOxrrqxQPdBjxmwC+Y9ulXTBDyo0Rd9bLdf/eW+PdjN83KlMC+PXvbI5tqajpUlXd82TljO63sb4BwMEiOIBajBupeWMBi5jaQaCGktluW2GZYcnP31milFJUHJkjJJ2tp0EWf8yAc5/Mf2CmMM4j5RBCmAJgIwGAGej5yT7XK6boYE4HAkFJACsBrBj4BYx0IG4hpPQvr2Xhd5CUnGL64eL7bym87ThBPYsYxBExk4JhWYD83S6S6u3rR1UC67pP4K04mpD2bnAjo3hXN1PUJsiykALgBIAtoh4DXDABABxgfQeA9ZtpE4I1gWmu53c+vW7loh6Jn9WcmHrgMnhL/8vnO88ZiC9sHTrDiOID7fRokUep0AO/+p7+WZzLRLQNmOyZ4yiqMRF31wwM8avklE0/sp589D+BTgSDd+IYAPZApgX1MMudRAH0WCIVT/d8wOo0ZIFkG0LGdjIMh+FPrMvHA3czu7oQlAAFDABACXjOwGYz1ANYx0Xrpsp7u71kjLPlUAt2npUEfBEJx8Xy3VdByJjHOT4GmE9g1kEKgL+0EBB8AHxMDLOA1A2+DeJlkXtIUjbw4oKKg3J/PbJzBzLMkWqcRkM/8aRtwAtkgHAbGYQQ+sXsKAkYq2ek1K1YR6LGUK6u6L0l3BpGj2mjnjQCu1829Dx0t0x8mm/5anaZ5+DNlij+3I4++C6YLOAUfiAnODvAHgHAAgHICw0gJeM3Aq8T8Vxa8xCmDwWEvEKZM8ee254kfSW69mpgOGOL3fDiYLhegy71moAmMu0RbflVvs+v1JsZ6ymaXC5aXSonpAGcNQZu5ATIZMI1U8g6vGfg/InF7Y13VuqFQeSa62usLPhaPhf6pm3yvySeIPwOYoU0xPPH4ZhWQyLmyHXwZeOBeDaeJbzHRdWC6zmsGVjHxXYmSo5ejslJnl+wDPU71esoqZrXniFfAuBPAAcPs/ieD8LDMb32pqLSiAirlcmWl8JgBf5EZWEcsVzIwC0DWMLBZNoA5zDLuLQ2Eisv9hw8JISx4wUS/P0s3+T4oXOAsr1kxW1ti+D1ajxm4iET26wDfAAx5cfBFSojpMe8zL6/1lleU68etUCB4fLMKPGYwTEyPgXDYMLfDOCYKe8sCNSo6vMnlQa/3mZefJ6CagWOGre8QAlKKjd7S4OVw+FwkgEJ3M12rm3yfH/e9x5TNPkDbYZiMjEz/IV6zopaAB9F1KNpwpgiSnioqDSw+vuycsfrp91MgFJuBIhLZCQJXZJQ1GKdLKdYXlQXO6uusgbes4ldC8ovAAK42H1xGgvgPXrNi2cTT/Y4ONAS6odgMFOlm36fGMTaL5b3aDkMfT9ns0wREAiAzozyYMLeTs9YV+QInai/oo0AoKq04XQJPA/hahtpkNDMe95QFftKbLxWX+/O9z7y8Akw3IiNPyaSZWZ1i1WTTf4iDK+mShAXFxfPduun3RT/D7y0Lfk9bYujiNYPziOUTAPbNUBMczAL12o/7IBA85UEfEy3DXvfaZ45diHG31wz8yM6HT5g2d7Rk8SSA6Rlut6MJ4pnCqfP2d3Av57EK2n6um35f7cf3eUv8+2lDDD2KyoIBgBeie4dzBpMD5qXe0uBM7RU2BUKRzz+OJC8DkKPN0jUkBvDHyWUVpV/1IZ/P50q2px4HQ09bdRntCMNKPj5u2rRsx9aR+abJpbMn6qfVJ/Yll7hbm2GIiQNf4ERmfgQ2FqZnCG4QLy0qD0zQpuhBIPh8PhcbYhGG3yrWfttHMC06Ydrc0Xv7QKs48JfduRY0/xmlnziqI/8GB9cwm0gu8Pv9hn5YfXi8hLlFZvAcbYmhwUSffyQLLMbw2EWlkhHMWKrjwN5xAUCrceAPwJzOEbAF4CUCPmBQMxNv69volFxgLgC4AERjwDgK6Z/xOCTZnroSwC+/+A9do1CpV8bvuRv5RWGpf/G6+sgrjpxFAE54rdm4AsAd+ln1RSTIP006eU5s/bNLt2prOJssEj8HcGQaL5EEsAHMHxGoWQr0KeuqYGQBKGDQPgCPATAB6V7PxfC83izOBfC/2lP2IBD8fr+xqZlvSlP5fwfT/Vk5RuyFmiVtypWx35/lbjaOJaCEwfMJOCJNvclPpkzx//aL5xUIsm4DKJ3qsx3AejAamWiTYLQBskUC28lAsk+3YmEME8YwcAAxTgTRyUjPmhO3IPELABc41fkJfGtReeCJgT6rYZgohIOMLOtOJz9fTdd2dSZckYY9yBKgMBP9r5G3fXXDihU7VV+gcOq8EUJ2HkcsTTBdDODA9GgEXKMFwl4EwqvNokwAqpPdvEkSsxtj4efTWfmNkUgSwHMAnvP7/Xe81iy+Q8BtAMYpvlR+R54xE0B49y+Ky/2HS0lnIR0Nj3klhFiQHGMt777HtFFcPN8t89uCBL6egfGKR+lzTpg296eKxeEmAJsBnKSgrGyWtMDv95dEIhErI1o84REw5kFB3goCzveagUg8Gq7JkHjZKYQcElsD81JbW7tGMdnfI2CUYh9KAHJuulMZd5//EgMQGzdt2q9HdoyeR8CtUJ+w71uTTf/xTdHIiyzFk0LgO+mdtOArVcQvYr4NJNKaHdZFzDNBSvVlk0vKMwb6JMXuAB+Z6PPXZAuxqDtzoUqVOfWzAoGZglC/4OdtFvSDRG04NlB2604xvcjn81W10gF/BOGHCovPTnZ0ngmgSqWAElJcJIVsBJCr4MlO2bTF+DGAezJDH/BTEmQRcL6iIh/0+GYdk4gta8mEeZOG2sizQ6zOZys2QXRne/usV1Yv3zaQN9F9MuVfvCX+x+EWywB8W2X5AjQVwIuJWOhNAG+mdVbHDAZJxek7hOcbo6EV6ayrIBIqE/q0WS55zmAes7wxFtl+5Fj5PQB1atsFF3+ul2IqUTza3pBKGp5EbSg2GHaLxWKpeH34Emb8TnGXVKK6rg2xqn8xf3lNSD+k+G+KfP5xyBAMIa8A4x1FxR0CI/t2aBwqCFUmbON3U0nX9wZaHHyW+KrIx0kpTwewUa2h6FjtLXsSTuBvqIuz9PP+HrepajZBdLrnMaDSkQ/7QsNTmZFvFwGznLDgq4A3Xw+CsldDzDQpHfVMnDrhTmZSNZrLYxIPwvnpotUIrNpIKwy+AIoOESXGxZPNwFQdTp1F8YwZeVA6HU/znRCjNsYi28GYi67F74oC1bA/TqCvAgEFiiz8UVtO68NOubGGVYs/APhOhUXmf6YDIaUNj/H7hmj4dSfYLRaLpWDRZeqEOR+UlopWVkoJ6yIAuxQNtXxes+KHmdLw47XVtWA8pOoxC+D+8SfNHAWNc2jJV7ltfb2T1prE68NNDDyiLgSr6geHn0BQklWLmRZ2vydyDG7J9wNIKSrO8Pv9AgBOmDZ3FABVuxeSljvrT47qPGKhfwK0RqGwSgvr6iOvgPhGhSOkO44rn3NEpjT+rBzXzwC8rai4r+dl596mQ6qDyO5QljGRiO53XOfFUlncJIZOv74XgaBGgZHid/4KWBuLfAiC8lWenNypruEBq9etXPSR02zHxGFVOi2tYqbk6LsBrFJU3IiUtB5AhrxqeKFmSRuYlL1qAHCp16w4RYfV4QdZ5Lj43lgfaQDwnn466UNVEgpJsuNFJ94gWzRbkKXkiM9IJCIBYMcY1zZ3M5ScdCkFbXKk3ViuoaGQlbWyUsqywEWCkYCSXQ0o85ZWnB+vr34oEwJAvD5UV2QG/8Lgi5UMOJgWFk6dN6l7i5pmeNDS4Bv/KmLOq5gkmIaU/X611de8Mlog2OtOtjh1m1M6tq105yaIDGfHSI1FIqsZEkMgd3tTXfjVotLg9Ux8l5rhEt1V6Ju7cl1sybuZEATc2cZVyY7U6VCRD4XwDaMz+SsAV+rwOlymD7AJlZXSqW1fP6D0oSj4U4s25fCiWwRtGyr1bTz1qD8AeEZRcfkuo/PPmfKsX6hZ0kYQ50PVqwbCT4vL/SfrVjRMkNDxXc8g9CsgtKWzkp6y4HXEfJV+XJ+DwXRzvD6UzgQ/WzFUDvCqrJSu8jnnp6TVBAWpo5npzKKyiu831lUvzgRnaoxWRT1lgQeJMV/FwIOl+IvPd54nFlvYPozMlOU1Ax1OrmAnicM31FVtVjyD0AaNFgj9IJXOShL4eAD76Mf1RcNwupN77BxK5lhbu/TfRWbgRgaUHEfMTPdONv31TdFIRiyEkkbWz4xUsgwKDvZhYHyr2PVLAMPtMDNHn4iYa6WUL7BlUAqajESfDa4ZXiPhUybcA9DTioorEBD3ZYrt1q1ctIMg5kPdroarPGWB47RXajRaIGg0g09lpbRc1vkAtisqcUZRaUVFppivMVoVBZTteXcR42Gf77wc7ZgajRYIGo0DRsKRN8B0varymOhPhVPn7Z8p9rNc7qsAqMrsOaGVdl2rvVKj0QJBo3EE8VOP+qPCVw37GqnkHzJHYC3aIYkvhrpdDdcVlfqLtVdqNFogaDSDj/pXDcGi0sB3MsV8TXXV9URQtf7CxSQWFBfP1+lsNRotEDQaJ4yEI2+QwlX0TPjTxNP9YzLFfikj62oAqjJ9Tpb5Lb/QXqnRaIGg0TiCxmj4TwA/pai4A7M6xX9njsBatIOZzwOgKIse3VjoCxyjvVKj0QJBo3ECzFLMZ3VZIed5SgNnZ4rxEvXVqwH8j6LislwCj+hXDRqNFggajTM6uVjoTTCuUVUeEf5n0slzMiZxlxix8xcAXlOi1gAvF7Rcob1So3E+ajIpMqVVaDCzpMw4gbe3dpfaCHZHwuH7iszA2QxMVVDcwS639XsAF2WC7RpWrNjpMYPnEXiVikEFM/3KW+b/W7wu8tIQM0VyW3bbaCdXcFNNjfJU0ASpB5JaIPSryae10ZAUt0HgBf24Po/F/ESaLzFiOMkphjGfYa0nYFT/nRIXFpVWRBrrq/+REQIrGnrOW1bxRzBdrqC4bEAs8Pv9J0ciEWso2SEdHbDTIdBoaLRA6AcF6axkPBb6J4B/6sc14AyrafR4dOlbXrPiaoCUbN9jovvHnzRz0iurl2/LBGcQebuulTvypgH4Zv+NhxNfbxaXAfhv3cwcrqxBBdoKmYmqqaN9i2fMyNPmHD5M9PuzoGKk7TiRUH0/CKpG/V/Ly869PVN8omHFip0g+QMASkb9DPzac9qcb+rW5niJcLi2gZ5B6Fc5ckfusQCecdoNes3gLWA+UUVZ+bx5WiwWSxXPmJFn7cxTcmIgSayO14cfcZrd3J+IycCwXPjBkuWFAmID1Mx8XeItr3g0XltdmwkBI14XWeMxA/cS8FMFxeWRZS1EZWUJKiv1ehrncqDHF/x6IhZ604Hx/T4wj+t3UCD6JBENBfSjTo9AAFic6jREhs/jAAAKI0lEQVSB4Pf7jU3Ncj6IlOTR39b2LQJiSG4dle3KsuYrqSThBACOEwjEOHG4On1TNPJeUWnwF0x8v5InaNEDE33+wo2xyPZMCBrGiJ3Xyx150wF8S0Fx3/Y8/fIlCXVbKTXdCGGwlIoO5jTkqQAcJRBOmDZ3dLIjdSEI/d42SyQ/0B6zBx8CsEtRj3KRz+dzOenmXm+m6QCpOmSnvaHhgc40VHOyI5PHMIZ1WuHG+tCDYH5Skcj7RrYQt2ZK0Oh+1XAeFL1qIMLvis3AkTocq0UmaZeqsojFD512f8mO1FwAanJqMG3THrMngUDcoqisw1voQOcci1tZKZjoJoVD6q2fNryDOneoVfrkqBS0hb7AMSD4FBXn1FE1S+KLACjxfwYuKyoLlmRK4IjXRdaAoeoAqxES/ACg9zKrpH2/VBtUHbgFnlJc7j/ZKffWvebtanXjIWzVHrMngcCkKtc6iHCP97TgwU64saJVL10FxrHquhPx6u4/boxEkgB2KrMbeK6nPOhziE+QIaBy4V2zU52/KRp5j4Gfq2pLzPyXKVP8uZkSPLbltF0HQFEuAzI9ZsVF0CijO069rWxGQoqFE33+kU64N7kj77cAvq4uBuNV7TF7EghAQuGgbCwsXlY4dd7+g3lT3tLAucx0m+IB5z+/4FEqk7wQsVzqhGlWT2ngRwCmq1PmtM7JDSARDf8FQI2i4r7VkSduzpTgsammpoMkLoSqVw2gO46bGjxMh2WVkUVlfMeRWUJUD7ZIKCqruBrAZWrDO+lt9HsRCDWKyzxOpJJrvGbFKQN9M8W+2Ud5zUAVCA8DMJQqVvp8UiICXlTsoAdJ4FlveUX54DW84I+JcI/a+CRXO74VGHQRFE0xMuNKML6dKQGkMRZ+nsB3KypudCrF90O/alDY/pTH92nZQjzjLQ1MHvD4bgaKvGWBJ5lJ9dZiJrb+rr3ly7i2ZbdFR3XkNwM8VqFTHgHQ097SQAxED1nSqF8XW/Ku6spPmeLP3ZmLScTiWIBmS5Lpekf2dlPJ0U+j7jMeJelREF+q+DoHQtJKjxmMGODbG6LhxoFwgsJS/3gD4mZmVr3Np1NI469ObwTxp0Lve0srrgLRAkWi+9JMCiKjZd6NrWLXWQCOUtEBqZqRSIeU9JQGfj4kHgrR6kQ09FwSYpkb8h4AWcp6U8ALQtxbFljOjCXSlfX0upWLPlJ9C+NPmjkqNyunUEAcD+J5EvCqWlHxBdY0xiKboPmyQNhUU9PhLQvcA4b6qVGCD2CfIVLwmoH3QfgIzJ8QqLmPjpkD0GgCj2Zgn3bgUAG4usYbnE47/faL+7TH7WvFXmsW/+4SQ4qbNrhCAhVeM/AvAM8yaDWIN7rJaN5pdLZs/Edka19vePxJM0fluvPGguQhAH2bBMrAKFc949JNqCFWtWUoNIR4ffVDXjPwXah5vWJkUhCJxRa2F5cGz5PEqxXdu1PtZxDhd0PhmTBkJYDnNtRVbfaWBhaBcKHy6M44m4CzjVQSXjPwNoAtBGwB0Nq3EjmPmUYDGI2uLK6HAhCc3tgO9a+jh5FAAAC2Ou4hI+sSMB2UxmsdDMbBXX7VP9fngbXRy6I1/y9f/GUkErE8ZYGbwFicxmsfBeAoAl8EBlJsIUsKeM1Av8PHp7O46TNmhwCG1vt4gy6GxRswzFJMDwQN9aEXPKWBO4nUrSzXKOsAbyXiINJ7tsrhAA7vVzjhwXizxNFEffgJ7SV7RgBAIrashVj8WJvjS+wiEsG95T9IlEyoAqNWm2mP44vrGqLh14dSleNPhd5n0M/0w+sb23PabgKwUVvCWSRioTeZcL22xJfYYkn3D7QZehAIANAYDT3GPDSmzwYIC4QLGuuq9r4Kv7JSipT7XBDrLFyf59F4yYQheQhPIhpaSMAy/Qh7z6aamg4BnAugU1vDYX5dF74HoCptif8M/iRxRTrWxg1LgQAAiVMnXAumh7VZYDHxhfG6cKinDzasWvyBlMZp6Hr3pmHE8mXu3KGcW5863ZcC+EQ/zN7TvbD2Tm0J57XMfJlzgcKDyoa0OCDmc5rqquu1KXohEFBZKeP1ofNZ3balodg9NDOJaYm6attCqam+aqNk4QPweiY7E4Mfy2mX02Oxhe1DupNbtfgDMK7Q4aFvbMtuqyRgg7aEs4jFFrYnx8iZAEIZbIa3iWVJY321Fkq9FgjdcT4Rrf4ZCLMZyKj81ASsBERxoq7qqd5+t6m+aqObkicAWJGBfmQxuPKbY9m/Zk1k13C4oXh9+BEGP6ZDRO/ZVFPTYQnSrxocyMZIJBmPhueA6ScAkhk2+KsSUhQ31kcatCf0XSB0Bci6cIhgTGLgbxlgh7cAOrcxGj49Hl36Vl8LebHuseZ4NDwToHMBfJwhPvQaWJYlotU3RyIRazjdmNGZ9WPoVw19oqk2FCfm32tLOBKO14fusSSKATyXCbqImc+MR0Nzhsq2a8cLBACIR5e+lYiGZwCYDtBwVF0vMXBxcqz8VjwaWqRs9BkNLcrKdo0D6FYAbcPUd9oAvjFf5hbG6yNPD8cbbFi1+AMi/okOE32jY1++GcB6bQlnsi4W3hA/ZUIJwHMwDM8iYOAFBirip0woTNRX60yJfcDW8czxaLgGwJPe0qDZnT3wLCjMzDXAbAawQhIvTecilRdqlrQBuPGEaXN/39luXcjEFwKYOAxa3TtE9JCLOu59se6x5uHeQBrrqhd7zcA5wPA+/jotw7ZIJDm5PPgDIfkFqDqWV6OWykoZB6r8fn/1a5/QDMH0IwbKMHSTfb0FYDkkPZKIhbrOV4jqx5xWgbC7a4jXh+oA1Hl8swqEkXUWM00FUAKFp2qlYyBDwEsMXgnix+MlE18YyBX23ULhbgB3e3x+jxDGLAk+g4DiXtp/MNkJxgpJeKjp1Am1Q3mHQp/olJfALUoA7KdDRu9oqg3FvWbwdoBv0NZwLt2vB5cBWFY4dd7+rs7OWZJQRiRL0pxAr7/sYGADwDUsxPKm2lBcP83BEQifkogtawGwuPsHx5edM7aT3RMZ4ggBLgCoQILzBVAAYAQDOWDkgsgNYCSBhQTyAYD2nrXODWBvp4a1AWgBsBWMrSR4B5h2MqMNhCQIHwL0krBowyh8sCkWi6U+/WZdZNCMnYhFEug6PbNy3LRp2SM6848WFk8igWMAPppZ7AfwqK4fGoVuGw3c5AC2EdAGwjtg/JuIm5jxfHIsP999dGy/1TiD/ir6kTKNByHnRHxV5GNPaeBiQZg7kNc1SHz42b8T00sg9NOBxVsDbb/kWOuWrE+Mg4l51IBdVPJrnw90olkywpkS2Puzi6T7XIUHun9QXPL9g6QrdTQgvwZBBQAXdMUmKiBGrgRyiZEDQjZAeQC7GBhFXa+w9xbDsgHk7eXfWgC0ELCVwVsB2kFAO0AtkmUSQrwPyRsNwoaGUya8MdQGLAR+FqB+r9eyBKU9h8P/A1efqS+8wxSZAAAAAElFTkSuQmCC';
    /**  header right - data */
    let factoryName = "Avonne";
    let address = "via delle vie, 10, Lomazzo, CO";
    let telephoneNumber = "(+39)0331.610000";
    let email = "email@email.it"

    /** second row */
    let titleLabel = "PARAMETRI DI CONFIGURAZIONE AUTOMAZIONE";

    /** third row */
    /* left block */
    let siteLabel = "Sito:";
    let siteName = "nome sito";
    let siteAddress = "via dei siti, 10, Lomazzo, CO";
    /* right block */
    let automationLabel = "Automazione:";
    let automationName = "nome automazione (installatore)";
    let automationAddress = "via delle automazioni, 10, Lomazzo, CO";

    /* fourth row */
    let customerLabel = "Cliente/Referente:";
    let customerName = "Venturini Consuelo";
    let customerPhoneLabel = "Tel:";
    let customerPhone = "(+39)0331611232";
    let customerEmailLabel = "Email:"
    let customerEmail = "venturini@consuelo.com";

    /* fifth row */
    let configurationLabel = "Dati configurazione:";
    let configurationNameLabel = "Nome configurazione:";
    let configurationName = "Config.GAAA789420";
    let configurationDateLabel = "Data configurazione:";
    let configurationDate = "25/05/2020";
    let automationTypelabel = "Tipologia automazione";
    let automationType = "Gate";
    let controlBoardLabel = "Scheda di controllo:";
    let controlBoard = "Board-5555";
    let fwLabel = "FW:";
    let fw = "ZAW-211";

    /* sixth row - table */
    let idxLabel = "IDX";
    let descParamLabel = "Descrizione parametro";
    let valueParamLabel = "Valore parametro"

    /* footer */
    let pageLabel = "Page";
    let ofLabel = "of";
    let poweredByLabel = "Powered by"
    let footerLogoImage = logoImage;

    let tableData = [];

    let jj = (new Date()).getTime();

    for(let ii=0; ii<100;ii++,jj+=1000){
      let idxData = (ii+1);
      let descParam  = "descrizione "+ jj.toString(36);
      let valueParam = (Math.random()*100).toFixed(2);
      tableData.push([{ text: idxData, style: 'headerLeft' }, { text: descParam, style: 'headerLeft' }, { text: valueParam, style: 'headerLeft' }]);
    }

    /* template */

    /* table widths (* -> all, auto -> text width, 100=px width) */
    /* border syntax: [left, top, right, bottom] */    
    let borderTop = [true, true, true, false]; 
    let borderMiddle = [true, false, true, false];
    let borderBottom = [true, false, true, true];

    let dd = {
      content: [
        /* first row */
        {
          columns: [
            {
              /* header left - logo */
              margin: [15, 20, 0, 0],
              image: logoImage,
              width: 180
            },
            {
              /* header right */
              margin: [100, 0, 0, 0],
              table: {
                widths: ['*'],
                body: [
                  [{ text: factoryName, border: borderTop, style: 'headerRight' }],
                  [{ text: address, border: borderMiddle, style: 'headerRight' }],
                  [{ text: telephoneNumber, border: borderMiddle, style: 'headerRight' }],
                  [{ text: email, border: borderBottom, style: 'headerRight' }]
                ]
              }
            }
          ]
        },
        /* second row */
        {
          margin: [0, 30, 0, 0],
          columns: [{ text: titleLabel, style: "headerTitle" }]          
        },
        /* third row */
        {
          margin: [0, 30, 0, 0],
          columns: [
            {
              table: {
                widths: [220],
                body: [
                  [{ text: siteLabel, border: borderTop, style: 'headerBoldLeft' }],
                  [{ text: siteName, border: borderMiddle, style: 'headerLeft' }],
                  [{ text: siteAddress, border: borderBottom, style: 'headerLeft' }]
                ]
              }
            },
            {
              margin: [23, 0, 0, 0],
              table: {
                widths: ['*'],
                body: [
                  [{ text: automationLabel, border: borderTop, style: 'headerBoldLeft' }],
                  [{ text: automationName, border: borderMiddle, style: 'headerLeft' }],
                  [{ text: automationAddress, border: borderBottom, style: 'headerLeft' }]
                ]
              }
            }
          ]
        },
        /* fourth row */
        {
          margin: [0, 10, 0, 0],
          columns: [{ 
            table: {
              widths: ["*"],
              body: [
                [{ text: customerLabel, border: borderTop, style: 'headerBoldLeft' }],
                [{
                  border: borderBottom,
                  columns : [
                    {text: customerName, style: 'headerLeft' },
                    {text: customerPhoneLabel + " " + customerPhone, style: 'headerLeft' },
                    {text: customerEmailLabel + " " + customerEmail, style: 'headerLeft' }
                  ]
                }]
              ]
            }
          }]
        },
        /* fifth row */
        {
          margin: [0, 10, 0, 0],
          columns: [{ 
            table: {
              widths: ["*"],
              body: [
                [{ text: configurationLabel, border: borderTop, style: 'headerBoldLeft' }],
                [{
                  border: borderMiddle,
                  columns : [
                    {text: configurationNameLabel + " "+ configurationName, style: 'headerLeft' },
                    {text: configurationDateLabel + " "+ configurationDate, style: 'headerLeft' }
                  ]
                }],
                [{
                  border: borderBottom,
                  columns : [
                    {text: automationTypelabel + " "+ automationType, style: 'headerLeft' },
                    {text: controlBoardLabel + " "+ controlBoard, style: 'headerLeft' },
                    {text: fwLabel + " "+ fw, style: 'headerLeft' }
                  ]
                }]
              ]
            }
          }]
        },
        /* sixth row */
        {
          margin: [0, 10, 0, 0],
          columns: [{ 
            table: {
              headerRows: 1,
              widths: [50,"*",150],
              body: [
                [{ text: idxLabel, style: 'headerBoldLeft' }, { text: descParamLabel, style: 'headerBoldLeft' }, { text: valueParamLabel, style: 'headerBoldLeft' }],
                ...tableData
              ]
            }
          }]
        }
      ],
      footer: function(currentPage, pageCount) {
        return [
          {
            margin: [35, 0, 35, 0],
            columns: [{ 
              table: {
                widths: ["*"],
                body: [                  
                  [{
                    border: [false,false,false,false],
                    columns : [
                      { width: '*', text: pageLabel + " " + currentPage.toString() + " " + ofLabel + " " + pageCount, style: "footerBase" },
                      { width: 70, text: poweredByLabel, style: "footerBase"  },
                      { width: 50, image: footerLogoImage, style: "footerBase" }
                    ]
                  }]
                ]
              }
            }]
          }
        ]
      },
      styles: {
        headerBase: {fontSize: 11, italics: false },
        headerLeft: {fontSize: 10, italics: false, bold: false, alignment: 'left' },
        headerLeftGrey: {fontSize: 11, italics: false, bold: false, alignment: 'left', color: 'grey' },
        headerRight: {fontSize: 10, italics: false, bold: false, alignment: 'right' },
        headerRightGrey: {fontSize: 11, italics: false, bold: false, alignment: 'right', color: 'grey' },
        headerBoldLeft: {fontSize: 11, italics: false, bold: true, alignment: 'left' },
        headerBoldRight: {fontSize: 11, italics: false, bold: true, alignment: 'right' },        
        headerTitle: {fontSize: 14, bold: true, alignment: 'center'},
        footerBase: {fontSize: 10, italics: false },
      }
    };

    let pdfDoc = printer.createPdfKitDocument(dd);
    let chunks = []
    let result;

    pdfDoc.on('data', function (chunk) {
      chunks.push(chunk)
    });
    pdfDoc.on('end', function () {
      result = Buffer.concat(chunks);
      res.contentType('application/pdf')
      res.send(result)
    });
    pdfDoc.end();
  }
}