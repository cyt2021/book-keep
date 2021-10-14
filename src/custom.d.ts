type RecordItem = {
    tags:string[]
    notes:string
    type:string
    amount:number
    createdAt?:Date
}
interface Window{
    tagList:Tag[]
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