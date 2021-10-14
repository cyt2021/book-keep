type RecordItem = {
    tags:string[]
    notes:string
    type:string
    amount:number
    createdAt?:Date
}

type Tag = {
    id: string;
    name: string;
}
type TagListModel = {
    data: Tag[]
    create: (name: string) => 'success' | 'duplicated'
    update: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
    fetch: () => Tag[]
    remove: (id: string) => boolean
    save: () => void
}
interface Window{
    tagList:Tag[];
    createTag:(name:string)=>void;
    findTag:(id:string)=>Tag
    removeTag:(id:string)=>boolean;
    updateTag: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
    recordList:RecordItem[]
    createRecord:(record:RecordItem)=>void;
}