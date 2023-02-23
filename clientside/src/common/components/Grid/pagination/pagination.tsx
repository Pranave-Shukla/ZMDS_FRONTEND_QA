import React, { ReactElement } from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch } from 'react-redux'

import { PageInfo } from 'sdk'

import { updatePaginate } from '../../Grid/redux/gridSlice'
import S from './pagination.module.scss'

const Pagination = ({
  getPaginatedPage,
  gridName,
  pageInfo,
}: {
  getPaginatedPage: (page: number) => void
  gridName: string
  pageInfo: PageInfo
}): ReactElement<any, any> => {
  // const pageNumber = useSelector((state: RootState) => state.grid[gridName].pageNumber) as
  //   | number
  //   | undefined
  const dispatch = useDispatch()

  const handlePageClick = (data: { selected: number }) => {
    dispatch(
      updatePaginate({
        gridName: gridName,
        pageNumber: data.selected,
      }),
    )

    getPaginatedPage(data.selected)
  }

  return (
    <div className={S.pagination}>
      <ReactPaginate
        activeClassName={'active'}
        breakClassName={'break-me'}
        breakLabel={'...'}
        containerClassName={'pagination'}
        marginPagesDisplayed={1}
        nextLabel={'>>'}
        onPageChange={handlePageClick}
        pageCount={pageInfo && pageInfo.totalPages ? pageInfo?.totalPages : 1}
        pageRangeDisplayed={2}
        previousLabel={'<<'}
      />
    </div>
  )
}

export { Pagination }
