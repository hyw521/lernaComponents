export interface DownloadProps {
    text?:string,
    url:string,
    methods: 'a' | 'stream',
    isNewWindow?:boolean,
    fileName?:string,
    replaceElement?: (fn:()=>void) => React.ReactDOM
}