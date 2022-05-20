package com.vti.specification;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import com.vti.entity.Department;
import com.vti.filter.DepartmentFilter;

public class DepartmentSpecificationBuilder {

	private DepartmentFilter filter;
	private String search;

	public DepartmentSpecificationBuilder(DepartmentFilter filter, String search) {
		this.filter = filter;
		this.search = search;
	}

	
	
	@SuppressWarnings("deprecation")
	public Specification<Department> build() {

		SearchCriteria seachCriteria = new SearchCriteria("name", "Like", search);
		SearchCriteria minTotalMemberCriteria = new SearchCriteria("totalMember", ">=", filter.getMinTotalMember());
		SearchCriteria maxTotalMemberCriteria = new SearchCriteria("totalMember", "<=", filter.getMaxTotalMember());

		Specification<Department> where = null;

		// search
		if (!StringUtils.isEmpty(search)) {
			where = new DepartmentSpecification(seachCriteria);
		}

		// min totalMember filter
		if (filter.getMinTotalMember() != 0) {
			if (where != null) {
				where = where.and(new DepartmentSpecification(minTotalMemberCriteria));
			} else {
				where = new DepartmentSpecification(minTotalMemberCriteria);
			}
		}

		// max totalMember filter
		if (filter.getMaxTotalMember() != 0) {
			if (where != null) {
				where = where.and(new DepartmentSpecification(maxTotalMemberCriteria));
			} else {
				where = new DepartmentSpecification(maxTotalMemberCriteria);
			}
		}

		return where;
	}
}
