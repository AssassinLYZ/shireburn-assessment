import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Layout from '@/layout/LayoutView.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(Layout, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('This is the table for Shireburn Assignment')
  })
})
