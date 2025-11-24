import { mount } from '@vue/test-utils';
import MatchDetails from '@/components/match-details.vue';

describe('MatchDetails.vue', () => {
  let wrapper;

  afterEach(() => {
    if (wrapper) {
      wrapper.destroy();
    }
  });

  it('renders correctly', () => {
    wrapper = mount(MatchDetails, {
      mocks: {
        $route: {
          params: { id: '123' }
        }
      }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('displays loading state when loading is true', async () => {
    wrapper = mount(MatchDetails, {
      mocks: {
        $route: {
          params: { id: '123' }
        }
      }
    });
    wrapper.setData({ loading: true, match: null });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.loading-state').exists()).toBe(true);
    expect(wrapper.text()).toContain('Loading match details...');
  });

  it('displays empty state when match is not found', async () => {
    wrapper = mount(MatchDetails, {
      mocks: {
        $route: {
          params: { id: '123' }
        }
      }
    });
    wrapper.setData({ loading: false, match: null });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.empty-state').exists()).toBe(true);
    expect(wrapper.text()).toContain('Match not found');
  });

  it('calculates KDA correctly', () => {
    wrapper = mount(MatchDetails, {
      mocks: {
        $route: {
          params: { id: '123' }
        }
      }
    });

    // Test normal KDA
    expect(wrapper.vm.calculateKDA(10, 5, 5)).toBe('3.00');

    // Test perfect KDA (no deaths)
    expect(wrapper.vm.calculateKDA(15, 0, 10)).toBe('25.00');

    // Test zero kills and assists
    expect(wrapper.vm.calculateKDA(0, 0, 0)).toBe('0.00');

    // Test high KDA
    expect(wrapper.vm.calculateKDA(20, 2, 10)).toBe('15.00');
  });

  it('formats numbers correctly', () => {
    wrapper = mount(MatchDetails, {
      mocks: {
        $route: {
          params: { id: '123' }
        }
      }
    });

    expect(wrapper.vm.formatNumber(1000)).toBe('1,000');
    expect(wrapper.vm.formatNumber(1000000)).toBe('1,000,000');
    expect(wrapper.vm.formatNumber(500)).toBe('500');
    expect(wrapper.vm.formatNumber(0)).toBe('0');
    expect(wrapper.vm.formatNumber(null)).toBe('0');
  });

  it('displays match overview with correct scores', async () => {
    const mockMatch = {
      radiant_score: 35,
      dire_score: 28,
      human_players: 10,
      players: [
        {
          account_id: 1,
          personaname: 'Player1',
          kills: 10,
          deaths: 2,
          assists: 15,
          gold: 15000,
          gold_per_min: 500
        }
      ]
    };

    wrapper = mount(MatchDetails, {
      mocks: {
        $route: {
          params: { id: '123' }
        }
      }
    });
    wrapper.setData({ loading: false, match: mockMatch });
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('35');
    expect(wrapper.text()).toContain('28');
    expect(wrapper.text()).toContain('10');
  });
});