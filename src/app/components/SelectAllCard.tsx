type SelectAllProps = {
    selectAll: boolean;
    setSelectAll:(value:boolean) => void;
}
const SelectAllCard = ({selectAll, setSelectAll}: SelectAllProps) => {
    const selectAllTaskHandler = () => {
        if()
    }

  return (
    <>
        <button className="text-sm border-b-2 border-gray-300 text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-all duration-300">
            Select all
        </button>
    </>
  )
}

export default SelectAllCard
// uncompleteの方だったら
//1.setselectAllをtrueにする
// 2. リストの中のcomplete＝falseを持つTaskが全部trueにPachされる

// completeの方だったら
//1.setselectAllをfalseにする　＝＞　リストの中のcomplete＝trueを持つTaskが全部falseにPachされる

